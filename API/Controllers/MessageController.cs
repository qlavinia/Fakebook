using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class MessageResponse
    {
        public List<Message> Messages { get; set; }
        public int TotalCount { get; set; }
    }

    public class MessageController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _environment;

        public MessageController(DataContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet("image")]
        public async Task<ActionResult<Message>> DisplayMessages()
        {
            Message message = await _context.Messages.FirstOrDefaultAsync();

            return message;
        }

        [HttpGet("messages")]
        public async Task<ActionResult<MessageResponse>> GetMessages(int page, int items, int userId)
        {
            if (userId == -1)
            {
                List<Message> messages = await _context.Messages.OrderByDescending(m => m.DatePublished).Include(m => m.User).
                Skip((page - 1) * items).Take(items).ToListAsync();

                int totalCount = await _context.Messages.CountAsync();
                MessageResponse response = new MessageResponse
                {
                    Messages = messages,
                    TotalCount = totalCount
                };
                return response;
            }
            else
            {

                List<int> friendsIds = await GetFriendsIDs(userId);

                List<Message> messages = await _context.Messages.Where(m => friendsIds.Contains(m.UserId)).Include(m => m.User).
                    Skip((page - 1) * items).Take(items).ToListAsync();

                int totalCount = await _context.Messages.CountAsync(m => friendsIds.Contains(m.UserId));

                MessageResponse response = new MessageResponse
                {
                    Messages = messages,
                    TotalCount = totalCount
                };
                return response;
            }
        }

        [HttpGet("own-messages")]
        public async Task<ActionResult<MessageResponse>> GetOwnMessages(int page, int items, int userId)
        {
            List<Message> messages = await _context.Messages.Where(m => m.UserId == userId).Include(m => m.User).
                Skip((page - 1) * items).Take(items).ToListAsync();

            int totalCount = await _context.Messages.CountAsync(m => m.UserId == userId);

            MessageResponse response = new MessageResponse
            {
                Messages = messages,
                TotalCount = totalCount
            };
            return response;
        }

        [HttpPost]
        public async Task<IActionResult> ProcessFormData([FromForm] FormDataModel formData, int userId)
        {
            string messsageText = formData.MessageText;
            string uniqueFileName;
            string filePath;

            #region save the file to the disk
            try
            {
                if (formData.FileInput == null || formData.FileInput.Length <= 0)
                {
                    return BadRequest("No file uploaded.");
                }

                string uploadsFolder = Path.Combine(_environment.ContentRootPath, "Uploads");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                uniqueFileName = Guid.NewGuid().ToString() + "_" + formData.FileInput.FileName;
                filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    formData.FileInput.CopyTo(fileStream);
                }

            }
            catch (Exception ex)                                                                                                                                                                                                                                                                                                                                                                                                                                       
            {
                return BadRequest(ex.ToString());
            }
            #endregion

            var message = new Message
            {
                MessageText = messsageText,
                ImagePath = $"Uploads/{uniqueFileName}",
                DatePublished = DateTime.Now,
                UserId = userId
            };

            _context.Add(message);
            await _context.SaveChangesAsync();

            return Ok("Message saved successfully");
        }
       
        private async Task<List<int>> GetFriendsIDs(int id)
        {
            try
            {

                var friendIds = await _context.Friends
                                            .Where(f => f.User1Id == id || f.User2Id == id)
                                            .Select(f => f.User1Id == id ? f.User2Id : f.User1Id)
                                            .ToListAsync();

                return friendIds;

            }
            catch (Exception ex)
            {
                // Handle exceptions
                throw new Exception("Error fetching IDs from the database", ex);
            }

        }
    }
}


