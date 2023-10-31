using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }

        public string MessageText { get; set; }

        public string ImagePath { get; set; }

        public int UserId { get; set; }

        public DateTime DatePublished { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
