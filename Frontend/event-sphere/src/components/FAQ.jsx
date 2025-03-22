import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I create an event?",
      answer:
        "To create an event, click on 'Create an Event' on the homepage, fill in the event details, and publish it.",
    },
    {
      question: "Is there a fee for registering an event?",
      answer:
        "No, registering an event is completely free. However, some premium features may require a subscription.",
    },
    {
      question: "How do I track event RSVPs?",
      answer:
        "You can track RSVPs in your event dashboard, where you’ll see a list of attendees and their responses.",
    },
    {
      question: "Can I sell tickets for my event?",
      answer:
        "Yes, you can enable ticket sales when creating an event. Our platform supports various payment gateways for ticket purchases.",
    },
    {
      question: "How do attendees receive event notifications?",
      answer:
        "Attendees receive email and push notifications for event updates, reminders, and changes in event details.",
    },
    {
      question: "Can I edit or cancel my event after publishing?",
      answer:
        "Yes, you can edit or cancel your event anytime through the event management dashboard. Attendees will be notified of any changes.",
    },
    {
      question: "Is there a limit to the number of events I can create?",
      answer:
        "There is no limit on the number of events you can create. However, free users may have restrictions on certain advanced features.",
    },
    {
      question: "How do I promote my event?",
      answer:
        "You can promote your event by sharing it on social media, sending invitations, and using our featured event promotion options.",
    },
    {
      question: "Do you support virtual or hybrid events?",
      answer:
        "Yes! Our platform supports in-person, virtual, and hybrid events with integrated live-streaming options.",
    },
    {
      question: "How can I contact support if I need help?",
      answer:
        "You can reach out to our support team through live chat, email, or our help center for assistance with any issues.",
    },
  ];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-[10px_10px_0px_#b0d9e8] border border-[#189ab4] mt-12">
      <h2 className="text-3xl font-extrabold text-[#05445e] mb-6 border-b-4 border-[#189ab4] pb-2 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow-md p-4 transition-all duration-300 bg-white hover:shadow-lg"
          >
            <button
              className="w-full text-left text-lg font-semibold text-[#05445e] flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

// import React, { useState } from "react";

// const FAQ = () => {
//   const faqs = [
//     { question: "How can I create an event?", answer: "You can create an event by clicking on the 'Create an Event' button on the homepage." },
//     { question: "How do I join an event?", answer: "Navigate to the event details page and click the 'Join' button to participate." },
//     { question: "Is there a mobile version available?", answer: "Yes, our platform is mobile-friendly and accessible on any device." },
//   ];

//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="max-w-full mx-auto my-12 p-8 bg-white shadow-lg rounded-2xl border border-[#189ab4]">
//       <h2 className="text-3xl font-extrabold text-[#05445e] mb-6 text-center border-b-4 border-[#189ab4] pb-2">
//         Frequently Asked Questions
//       </h2>
//       <div className="space-y-4">
//         {faqs.map((faq, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-md border border-gray-200 rounded-lg p-5 transition-all cursor-pointer hover:shadow-lg"
//             onClick={() => toggleFAQ(index)}
//           >
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold text-[#05445e]">{faq.question}</h3>
//               <span className="text-[#189ab4] font-bold text-xl">
//                 {openIndex === index ? "−" : "+"}
//               </span>
//             </div>
//             {openIndex === index && (
//               <p className="text-gray-600 mt-3 transition-opacity">{faq.answer}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FAQ;

// import React, { useState } from "react";

// const faqData = [
//   { question: "What is Clever’s primary function?", answer: "Clever helps streamline and manage various team activities effectively." },
//   { question: "How does Clever improve team collaboration?", answer: "Clever offers tools for real-time communication and task tracking to improve collaboration." },
//   { question: "Can I access Clever offline?", answer: "Yes, Clever provides offline mode for certain functionalities." },
//   { question: "Is Clever available on mobile devices?", answer: "Yes, Clever has mobile apps for both iOS and Android." },
//   { question: "What security features does Clever offer?", answer: "Clever implements end-to-end encryption and multi-factor authentication for security." },
// ];

// const FAQ = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold text-center mb-4">Frequently Asked Questions</h2>
//       <div className="space-y-4">
//         {faqData.map((faq, index) => (
//           <div key={index} className="border rounded-md p-4 cursor-pointer" onClick={() => toggleFAQ(index)}>
//             <div className="flex justify-between items-center">
//               <span className="font-medium">{faq.question}</span>
//               <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
//             </div>
//             {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FAQ;
