import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const Footers = () => {
  return (
    <Footer container className="bg-white  ">
      <div className="w-full container">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="flex flex-row font-bold text-5xl">
            <p className="text-BLUE05">As</p>
            <p className="text-YELLOW05">Tani</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link>React JS</Footer.Link>
                <Footer.Link>Tailwind CSS</Footer.Link>
                <Footer.Link>Figma</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link>Github</Footer.Link>
                <Footer.Link>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link>Privacy Policy</Footer.Link>
                <Footer.Link>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="AsTani™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon icon={BsFacebook} />
            <Footer.Icon icon={BsInstagram} />
            <Footer.Icon icon={BsTwitter} />
            <Footer.Icon icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footers;
