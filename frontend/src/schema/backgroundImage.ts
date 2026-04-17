interface BackgroundImageStyle {
  backgroundImage: string;
  backgroundSize: string;
  backgroundRepeat: string;
  backgroundPosition: string;
  backgroundAttachment: string;
  width: string;
  marginBottom: string;
}

export const backgroundImage: BackgroundImageStyle = {
  backgroundImage:
    'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("../assets/images/56716d89e6.jpg")',
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "50% 30%",
  backgroundAttachment: "scroll",
  width: "100%",
  marginBottom: "90px",
};
