import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { date } from "../utils/date";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  newsletterSchema,
  NewsletterFormData,
} from "../schema/subscriptionSchema";

export const Footer = () => {
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const emailValue = watch("parentsEmail");

  const mutation = useMutation(apiClient.newsletter, {
    onSuccess: async () => {
      (reset(),
        showToast({
          message: "Subscription successful! Verification email sent.",
          type: "SUCCESS",
        }));
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || "Subscription failed. Please try again.";

      showToast({
        message: errorMessage.includes("User already exists")
          ? "User already exists. Please use a different email."
          : errorMessage,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <footer className='bg-prcolor py-8 md:py-24'>
      <div className='container sm:w-4/5 mx-auto px-4 pt-12'>
        {/* Footer Main Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Left Side: Newsletter and About */}
          <div className='flex flex-col gap-8'>
            <div>
              <h3 className='text-2xl md:text-3xl font-bold mb-2 text-white'>
                Wealthy Home Academy
              </h3>
              <p className='text-white text-sm md:text-base'>
                An Academic Institution that trains your children <br /> to
                become the best they can be.
              </p>
            </div>

            <div>
              <h1 className='text-xl md:text-2xl font-bold text-white mb-2'>
                Subscribe To Our Newsletter
              </h1>
              <form onSubmit={onSubmit} className='w-full max-w-md'>
                <div className='flex items-center bg-white rounded-lg overflow-hidden'>
                  <FaEnvelope className='text-blue-600 ml-3 text-xl flex-shrink-0' />
                  <input
                    type='email'
                    className='flex-grow py-2 px-4 outline-none border-none text-sm'
                    placeholder='Enter your email'
                    {...register("parentsEmail")}
                  />
                  <button
                    type='submit'
                    disabled={!emailValue} 
                    className={`flex-shrink-0 py-2 px-6 font-semibold transition-colors duration-300 ${
                      emailValue
                        ? "bg-purple-600 text-white cursor-pointer"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                  >
                    Subscribe
                  </button>
                </div>
                {errors.parentsEmail && (
                  <span className="text-red-700 before:content-['⚠_']">
                    {errors.parentsEmail.message}
                  </span>
                )}
              </form>
            </div>

            <div>
              <h1 className='text-white font-bold text-2xl'>
                Wealthy Home Academy
              </h1>
              <p className='text-white fontbold mt-2'>
                Your wards academic solution
              </p>
              <div className='flex gap-5 mt-4 sm:mt-4'>
                <Link to='#' title='LinkedIn'>
                  <FaLinkedinIn className='text-white hover:text-blcolor text-xl' />
                </Link>
                <a href='#' title='Facebook'>
                  <FaFacebook className='text-white hover:text-blcolor text-xl' />
                </a>
                <a href='#' title='Instagram'>
                  <FaInstagram className='text-white hover:text-blcolor text-xl' />
                </a>
                <a href='#' title='Twitter'>
                  <FaTwitter className='text-white hover:text-blcolor text-xl' />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Links */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm text-white'>
            <div>
              <h1 className='text-lg font-bold text-white opacity-75 mb-4'>
                Subjects
              </h1>
              <ul>
                {[
                  "Mathematics",
                  "English",
                  "Civic Studies",
                  "Physical Health Education",
                  "Religion and National Values",
                  "Social Skills",
                  "French Language",
                  "Cultural and Creative Arts",
                  "Basic Science and Technology",
                  "Hausa Language",
                  "Yoruba Language",
                  "Igbo language",
                ].map((subject, index) => (
                  <li
                    key={index}
                    className='mb-2 hover:text-blcolor hover:translate-x-2 hover:ease-in duration-300'
                  >
                    <Link to={`/${subject.toLowerCase().replace(/ /g, "-")}`}>
                      {subject}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h1 className='text-lg font-bold text-white opacity-75 mb-4'>
                Company
              </h1>
              <ul>
                {[
                  "About Us",
                  "Privacy Policy",
                  "Partnerships",
                  "Contact Us",
                  "Quiz",
                  "Meet our teachers",
                ].map((item, index) => (
                  <li
                    key={index}
                    className='mb-2 hover:text-blcolor hover:translate-x-2 hover:ease-in duration-300'
                  >
                    <Link to={`/${item.toLowerCase().replace(/ /g, "-")}`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h1 className='text-lg font-bold text-white opacity-75 mb-4'>
                Community
              </h1>
              <ul>
                {[
                  "Blog & Articles",
                  "FAQ",
                  "Invest With Us",
                  "Parents Day",
                  "E-Learning",
                ].map((item, index) => (
                  <li
                    key={index}
                    className='mb-2 hover:text-blcolor hover:translate-x-2 hover:ease-in duration-300'
                  >
                    <Link to={`/${item.toLowerCase().replace(/ /g, "-")}`}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className='mt-10'>
          <section className='mt-9'>
            <hr className='w-full mb-4 border-t border-white' />
            <p className='text-white text-center'>
              © Wealthy Homes Academy {date}. All rights reserved
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
