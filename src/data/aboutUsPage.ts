import headecImage from "@/assets/about/Headache-Migraine.png";
import tmjImage from "@/assets/about/TMJPhysiotherapy.png";

interface Option {
  title: string;
  description: string;
}

export interface Treatment {
  title: string;
  description: string;
  helpTitle: string;
  helpDescription: string;
  options: Option[];
  image: string;
}

const HeadacheMigraineData: Treatment = {
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

const TMJPhysiotherapy: Treatment = {
  title: "TMJ Physiotherapy Treatment",
  description: `If you experience jaw pain, clicking, difficulty chewing, or tension around your face and neck, you may have Temporomandibular Joint (TMJ) Dysfunction. This condition can be caused by muscle tightness, joint misalignment, teeth grinding (bruxism), stress, or poor posture. Physiotherapy can help relieve pain, restore jaw function, and prevent future discomfort.`,
  helpTitle: `How Physiotherapy Can Help`,
  helpDescription: `Our TMJ treatment approach is designed to reduce pain, improve movement, and address the underlying causes of your symptoms. This includes:`,
  options: [
    {
      title: "Manual Therapy",
      description: `Gentle joint mobilizations and soft tissue techniques to release muscle tension and improve jaw movement.`,
    },
    {
      title: "Dry Needling & Myofascial Cupping",
      description: `Targeting trigger points in the jaw, face, and neck to relieve tightness and pain.`,
    },
    {
      title: "Postural Correction",
      description: ` Addressing head, neck, and shoulder posture to reduce strain on the jaw.`,
    },
    {
      title: "Exercise Therapy",
      description: `Specific jaw and neck exercises to improve stability, alignment, and muscle coordination.`,
    },
    {
      title: "Relaxation & Stress Management",
      description: `Techniques to reduce jaw clenching and tension caused by stress.`,
    },
    {
      title: "Electrotherapy & Heat Therapy",
      description: `Pain relief methods to soothe irritated muscles and joints.`,
    },
  ],
  image: tmjImage.src,
};




export { HeadacheMigraineData, TMJPhysiotherapy };
