import headecImage from "@/assets/about/Headache-Migraine.png";

interface Option {
  title: string;
  description: string;
}

interface Treatment {
  title: string;
  description: string;
  helpTitle: string;
  helpDescription: string;
  options: Option[];
  image: string;
}

const HeadacheMigraine: Treatment = {
  title: "Headache & Migraine Physiotherapy Treatment",
  description: `If you suffer from frequent headaches or migraines, physiotherapy can be an effective way to reduce pain, improve mobility, and prevent future episodes. Many headaches stem from muscular tension, poor posture, joint dysfunction, or nerve irritation in the neck and shoulders. Our specialized physiotherapy approach targets these underlying causes to provide lasting relief.`,
  helpTitle: `How Physiotherapy Can Help`,
  helpDescription: `Using a combination of hands-on techniques and tailored exercises, we focus on:`,
  options: [
    {
      title: "Postural Correction",
      description: ` Addressing poor posture that may be straining your neck and upper back.`,
    },
    {
      title: "Manual Therapy",
      description: `Gentle joint mobilizations and soft tissue techniques to release tension and improve mobility.`,
    },
    {
      title: "Dry Needling & Myofascial Cupping",
      description: `Targeting trigger points and muscle tightness that contribute to headaches.`,
    },
    {
      title: "Electrotherapy & Heat Therapy ",
      description: `Using advanced modalities to relieve pain and promote relaxation.`,
    },
    {
      title: "Stress & Tension Management",
      description: `Providing relaxation techniques and guidance on reducing daily tension.`,
    },
    {
      title: "Exercise & Stretching Programs",
      description: `Strengthening key muscles to improve stability and prevent recurrences.`,
    },
  ],
  image: headecImage.src,
};

export { HeadacheMigraine };
