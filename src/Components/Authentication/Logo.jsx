import LogoImage from "../../assets/logo.jpeg";

const Logo = ({ logoTop }) => (
  <div
    className="absolute "
    style={{ top: logoTop }}
  >
    <img src={LogoImage} alt="Logo"  className="w-32 h-32 object-cover rounded-full"/>
  </div>
);

export default Logo;
