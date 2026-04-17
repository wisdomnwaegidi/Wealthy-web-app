import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div>{children}</div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
