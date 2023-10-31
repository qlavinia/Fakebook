namespace API.DTOs
{
    public class FormDataModel
    {
        public string MessageText { get; set; }

        public IFormFile FileInput { get; set; }
    }
}
