import { FaPhone, FaEnvelope, FaGlobe, FaHome } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  messageSubject: z.string().min(1, "Message subject is required"),
  userMessage: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (formValues: FormData) => {
    await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    reset();
  };

  return (
    <div className="my-12 md:my-36">
      <div className="bg-prcolor py-10 mb-12 md:mb-20">
        <h1 className="text-white text-4xl md:text-6xl font-bold grid grid-cols-1 md:grid-cols-2 w-4/5 md:w-3/4 mx-auto gap-10 md:gap-20">
          Contact Us!
        </h1>
      </div>
      <div>{isSubmitSuccessful && <Submitsuccessful />}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-11/12 md:w-4/5 mx-auto gap-10 md:gap-20">
        <div className="px-4 md:px-8">
          <div className="mb-6">
            <h4 className="text-lg text-dark-blue">Get in touch with us</h4>
            <h1 className="text-2xl md:text-4xl text-dark-blue">
              Have any questions?
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Name"
                  className={`py-2 px-4 w-full border-2 border-prcolor rounded-md ${
                    errors.name ? "border-purple-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-purple-500 font-semibold text-sm mt-1">
                    ⚠ {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className={`py-2 px-4 w-full border-2 border-prcolor rounded-md ${
                    errors.email ? "border-purple-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-purple-500 font-semibold text-sm mt-1">
                    ⚠ {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <input
                type="text"
                {...register("messageSubject")}
                placeholder="Message Subject"
                className={`py-2 px-4 w-full border-2 border-prcolor rounded-md ${
                  errors.messageSubject ? "border-purple-500" : ""
                }`}
              />
              {errors.messageSubject && (
                <p className="text-purple-500 font-semibold text-sm mt-1">
                  ⚠ {errors.messageSubject.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                {...register("userMessage")}
                placeholder="Leave Message"
                rows={6}
                className={`py-2 px-4 w-full resize-y border-2 border-prcolor rounded-md ${
                  errors.userMessage ? "border-purple-500" : ""
                }`}></textarea>
              {errors.userMessage && (
                <p className="text-purple-500 font-semibold text-sm mt-1">
                  ⚠ {errors.userMessage.message}
                </p>
              )}
            </div>
            <button
              className={`rounded-md ${
                isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-400"
              } text-white py-3 px-6 font-bold mt-4 transition-colors duration-300`}
              disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div
                    className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full mr-2"
                    role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p>Submitting</p>
                </span>
              ) : (
                "Submit Now"
              )}
            </button>
          </form>
        </div>
        <div className="px-4 md:px-8">
          <ul>
            <li className="flex items-center gap-4 mb-8">
              <div className="text-blue-500 bg-gray-200 rounded-full text-2xl md:text-3xl p-2 hover:text-yellow-500 transition duration-300">
                <FaHome />
              </div>
              <div className="flex flex-col">
                <span className="text-dark-blue font-semibold uppercase">
                  Visit our location
                </span>
                <a
                  href="#"
                  className="text-dark-blue font-bold text-sm md:text-lg hover:text-yellow-500 transition duration-300">
                  #39 Ojo Barracks Street Lagos Mainland
                </a>
              </div>
            </li>
            <li className="flex items-center gap-4 mb-8">
              <div className="text-blue-500 bg-gray-200 rounded-full text-2xl md:text-3xl p-2 hover:text-yellow-500 transition duration-300">
                <FaPhone />
              </div>
              <div className="flex flex-col">
                <span className="text-dark-blue font-semibold uppercase">
                  Give us a Call
                </span>
                <a
                  href="tel:+2348035388627"
                  className="text-dark-blue font-bold text-sm md:text-lg hover:text-yellow-500 transition duration-300">
                  +234-803-538-8627
                </a>
              </div>
            </li>
            <li className="flex items-center gap-4 mb-8">
              <div className="text-blue-500 bg-gray-200 rounded-full text-2xl md:text-3xl p-2 hover:text-yellow-500 transition duration-300">
                <FaEnvelope />
              </div>
              <div className="flex flex-col">
                <span className="text-dark-blue font-semibold uppercase">
                  Send us a message
                </span>
                <a
                  href="mailto:wealthyhomesacademy@gmail.com"
                  className="text-dark-blue font-bold text-sm md:text-lg hover:text-yellow-500 transition duration-300">
                  wealthyhomesacademy@gmail.com
                </a>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="text-blue-500 bg-gray-200 rounded-full text-2xl md:text-3xl p-2 hover:text-yellow-500 transition duration-300">
                <FaGlobe />
              </div>
              <div className="flex flex-col">
                <span className="text-dark-blue font-semibold uppercase">
                  Visit our website
                </span>
                <a
                  href="https://www.wealthyhomeacademy.com"
                  className="text-dark-blue font-bold text-sm md:text-lg hover:text-yellow-500 transition duration-300">
                  www.wealthyhomeacademy.com
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Submitsuccessful = () => {
  return (
    <div className="mb-8">
      <h1 className="text-xl font-semibold text-green-600">
        You&apos;ve successfully submitted a request!
      </h1>
    </div>
  );
};

export default Contact;
