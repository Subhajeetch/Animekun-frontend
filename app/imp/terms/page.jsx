import Link from "next/link";

export const metadata = {
  title: "Terms of use - Animekun",
  description:
    "Read our terms of use so you can use animekun site with it's full potential.",
  keywords: [
    "terms of use",
    "terms of service",
    "terms of use of animekun",
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
    title: "Terms of use - Animekun",
    description:
      "Read our terms of use so you can use animekun site with it's full potential.",
    url: "https://animekun.lol/imp/terms",
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
    canonical: "/imp/terms"
  }
};

const Terms = () => {
  return (
    <main className=" bg-backgroundtwo">
      <div className="max-w-[1800px] mx-auto p-4">
        <h1 className="font-[700] mb-2">Terms of use</h1>
        <p className="ml-2 text-discriptionForeground text-[14px]">
          Welcome to Animekun! By accessing or using our website, you agree to
          comply with these Terms of Use. Please read them carefully before using
          our services.
        </p>
        <div className="mt-16">
          <h2 className="text-[18px] font-[700]"> -/ Eligibility </h2>
          <p className="ml-6 text-discriptionForeground text-[14px]">
            You must be at least <strong>14 years old</strong> to use Animekun. If
            you are under 14, you must have parental or{" "}
            <strong>guardian supervision</strong>. By using this site, you affirm
            that you meet the eligibility requirements and that you are legally
            capable of entering into this agreement. Dont use it if you don't know
            what you are doing.
          </p>
          <h2 className="text-[18px] font-[700] mt-4">
            {" "}
            -/ User Responsibilities
          </h2>
          <p className="ml-6 text-discriptionForeground text-[14px]">
            You agree not to post, upload, or distribute any content that is
            illegal, offensive, or infringes on any intellectual property rights.
            Users must not engage in any activity that disrupts the site’s
            operation, harasses other users, or violates any applicable laws. Any
            attempts to gain unauthorized access to our systems, introduce harmful
            software, or manipulate our services are strictly prohibited.
          </p>
          <h2 className="text-[18px] font-[700] mt-4"> -/ Content Ownership</h2>
          <p className="ml-6 text-discriptionForeground text-[14px]">
            <strong>Animekun</strong> does not host any videos but provides links
            to third-party content. All anime, images, and materials are the
            property of their respective copyright owners. We do not claim
            ownership or responsibility for any content hosted on external sites.
            By using our service, you acknowledge that Animekun does not create,
            distribute, or own the content available on the site and that all
            rights belong to their respective owners.
          </p>
          <h2 className="text-[18px] font-[700] mt-4">
            -/ Modifications and Service Availability
          </h2>
          <p className="ml-6 text-discriptionForeground text-[14px]">
            We reserve the right to modify, update, or discontinue any part of our
            service at any time without prior notice. We strive to provide an
            uninterrupted experience, but we do not guarantee continuous
            availability of the site or its features. Service interruptions may
            occur due to maintenance, upgrades, or unforeseen technical issues.
          </p>
          <h2 className="text-[18px] font-[700] mt-4"> -/ Account Termination</h2>
          <p className="ml-6 text-discriptionForeground text-[14px]">
            We may terminate or suspend your access if you violate these terms or
            engage in harmful activities that impact Animekun’s functionality or
            community. Users who repeatedly engage in misconduct, spamming, or
            abusive behavior may have their accounts permanently banned without
            prior warning.
          </p>

          <h2 className="text-[18px] font-[700] mt-4">
            {" "}
            -/ Disclaimers and Limitation of Liability
          </h2>
          <p className="ml-6 text-discriptionForeground text-[14px]">
            Animekun is provided "as is." We do not guarantee uninterrupted
            service and are not liable for any damages arising from the use of our
            platform. We make no warranties regarding the reliability, accuracy,
            or legality of the content provided through our site. Your use of
            Animekun is at your own risk.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Terms;
