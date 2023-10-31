
namespace API.Entities
{
    public class Friend
    {
        public int FriendId { get; set; }

        public int User1Id { get; set; }

        public int User2Id { get; set; }

        public virtual User User1 { get; set; }

        public virtual User User2 { get; set; }
    }
}
