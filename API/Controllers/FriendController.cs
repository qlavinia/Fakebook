using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using API.DTOs;

namespace API.Controllers
{
    public class FriendController : BaseApiController
    {

        private readonly DataContext _context;

        public FriendController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        //api/friends
        public async Task<IEnumerable<User>> GetFriends(int id)
        {
            var friends = await _context.Friends.Where(f => f.User1Id == id || f.User2Id == id).
                            Select(f => f.User1Id == id ? f.User2 : f.User1).ToListAsync();


            return friends;
        }

        [HttpGet("isFriend/{userId}/{friendId}")]
        public async Task<bool> UserIsFriend(int userId, int friendId)
        {

            Friend friend = await _context.Friends.FirstOrDefaultAsync(f => (f.User1Id == userId && f.User2Id == friendId) || (f.User1Id == friendId && f.User2Id == userId));

            if (friend != null)
                return true;
                
            return false;
        }

        [HttpPost("addFriend/{user1Id}/{user2Id}")]
        public async Task<IActionResult> AddFriend(int user1Id, int user2Id)
        {
            Friend friend = new Friend
            {
                User1Id = user1Id,
                User2Id = user2Id
            };

            _context.Add(friend);
            await _context.SaveChangesAsync();

            return Ok("Friend added successfully");
        }


        [HttpPost("removeFriend/{user1Id}/{user2Id}")]
        public async Task<IActionResult> RemoveFriend(int user1Id, int user2Id)
        {
            Friend friend = await _context.Friends.FirstOrDefaultAsync(f => (f.User1Id == user1Id && f.User2Id == user2Id) || (f.User1Id == user2Id && f.User2Id == user1Id));

            _context.Remove(friend);
            await _context.SaveChangesAsync();

            return Ok("Friend removed successfully");
        }
    }
}
