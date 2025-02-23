import Link from "next/link";

export const metadata = {
  title: "Privacy policy - Animekun",
  description:
    "Read our privacy policy so you can use animekun site with it's full potential.",
  keywords: [
    "Privacy policy",
    "Privacy policy read",
    "Privacy policy of animekun",
    "best site to watch anime",
    "online watch anime",
    "hd anime",
    "anime site ads free",
    "no ads anime website",
    "watch anime",
    "ad free anime site",
    "anime online",
    "free anime online",
    "online anime",
    "anime streaming",
    "stream anime online",
    "english anime",
    "english dubbed anime"
  ],
  openGraph: {
    title: "Privacy policy - Animekun",
    description:
      "Read our privacy policy so you can use animekun site with it's full potential.",
    url: "https://animekun.top/imp/policy",
    siteName: "AnimeKun",
    images: [
      {
        url: "https://i.imgur.com/MNnhK3G.jpeg",
        width: 1200,
        height: 430,
        alt: "Animekun Website Banner"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  alternates: {
    canonical: "/imp/policy"
  }
};

const Terms = () => {
  return (
    <main className="p-4 md:px-[54px] bg-backgroundtwo">
      <h1 className="font-[700] mb-2">Privacy Policy</h1>
      <p className="ml-2 text-discriptionForeground text-[14px]">
        Your privacy is important to us. This policy outlines how we collect,
        use, and protect your information.
      </p>
      <div className="mt-16">
        <h2 className="text-[18px] font-[700]"> -/ Information We Collect </h2>

        <ul
          className="ml-6 mt-2 text-discriptionForeground text-[14px] flex
        flex-col gap-2"
        >
          <li>
            <strong>Personal Data: </strong> If you create an account, we may
            collect your email address and other necessary details to provide
            you with our services.
          </li>
          <li>
            <strong>Usage Data: </strong> We may collect information such as IP
            addresses, device type, browser type, and browsing activity for
            analytics, security, and functionality improvements.
          </li>

          <li>
            <strong>Cookies: </strong> We use cookies to enhance your
            experience, store preferences, and improve site functionality.
          </li>
        </ul>

        <h2 className="text-[18px] font-[700] mt-4">
          {" "}
          -/ How We Use Your Information
        </h2>
        <ul
          className="ml-6 mt-2 text-discriptionForeground text-[14px] flex
        flex-col gap-2"
        >
          <li>
            To provide and improve our services, ensuring an optimal user
            experience.
          </li>
          <li>To personalize content and enhance user engagement.</li>

          <li>
            To detect and prevent fraudulent activities, security breaches, and
            illegal activities.
          </li>
          <li>
            To communicate with users regarding updates, new features, or
            support inquiries.
          </li>
        </ul>
        <h2 className="text-[18px] font-[700] mt-4"> -/ Data Sharing</h2>
        <ul
          className="ml-6 mt-2 text-discriptionForeground text-[14px] flex
        flex-col gap-2"
        >
          <li>
            We do not sell, trade, or rent personal information to third
            parties.
          </li>
          <li>
            Your data is well encrypted, hidden and will be never shared with
            any kind of parties.
          </li>
        </ul>
        <h2 className="text-[18px] font-[700] mt-4">-/ Security Measures</h2>
        <ul
          className="ml-6 mt-2 text-discriptionForeground text-[14px] flex
        flex-col gap-2"
        >
          <li>
            We implement industry-standard security practices to protect your
            data from unauthorized access, breaches, or misuse.
          </li>
          <li>
            Despite our efforts, no data transmission over the internet is 100%
            secure, and we encourage users to take precautions when sharing
            personal information. Please never share your personal information
            with anyone not even with us!
          </li>
        </ul>
        <h2 className="text-[18px] font-[700] mt-4"> -/ Third-Party Links: </h2>
        <p className="ml-6 text-discriptionForeground text-[14px]">
          Our site may contain links to external websites. We are not
          responsible for their privacy policies or content. We recommend
          reviewing their policies before sharing personal information.
        </p>

        <h2 className="text-[18px] font-[700] mt-4">
          {" "}
          -/ Policy Updates
        </h2>
        <p className="ml-6 text-discriptionForeground text-[14px]">
          We may update this policy periodically. Any changes will be posted on this page, and continued use of the site after updates implies acceptance of the new terms.
        </p>
      </div>
    </main>
  );
};

export default Terms;
