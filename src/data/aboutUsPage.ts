import headecImage from "@/assets/about/Headache-Migraine.png";
import tmjImage from "@/assets/about/TMJPhysiotherapy.png";
import wetCuppingImage from "@/assets/about/Wet Cupping.png";
import physiotherapyImage from "@/assets/about/Physiotherapy After image.png";
import medicalMassageImage from "@/assets/about/medicalMessageTherapy.png";

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

const WetCupping: Treatment = {
  title: "Wet Cupping (Hijama) Therapy",
  description: `Wet cupping, also known as Hijama cupping therapy, is a traditional treatment that combines the benefits of negative pressure (suction) with controlled therapeutic bleeding to promote healing and detoxification. This ancient practice is used to relieve pain, reduce inflammation, and improve circulation, making it an excellent complement to physiotherapy for a wide range of conditions.`,
  helpTitle: "How Wet Cupping (Hijama) Can Help",
  helpDescription: `By drawing out stagnant blood and toxins while stimulating fresh circulation, Hijama therapy may assist with:`,
  options: [
    {
      title: "Pain Relief",
      description: `Effective for chronic pain, muscle tension, and joint stiffness.`,
    },
    {
      title: "Detoxification & Improved Circulation",
      description: `Supports the body’s natural healing processes.`,
    },
    {
      title: "Inflammation Reduction",
      description: `Helps with conditions like arthritis, fibromyalgia, and sports injuries.`,
    },
    {
      title: "Headache & Migraine Relief",
      description: `Reduces tension and promotes relaxation.`,
    },
    {
      title: "Stress & Fatigue Management",
      description: `Enhances overall well-being by lowering stress levels.`,
    },
    {
      title: "Boosting Immune Function",
      description: `Encourages the body’s natural detox and immune response.`,
    },
  ],
  image: wetCuppingImage.src,
};

const PhysiotherapyData: Treatment = {
  title: "Physiotherapy After Plastic Surgery",
  description: `Recovering from plastic surgery requires specialized care to promote healing, reduce swelling, and restore mobility. Physiotherapy plays a vital role in enhancing recovery, preventing complications, and improving overall results after procedures such as liposuction, tummy tucks (abdominoplasty), breast augmentation, facelifts, and other cosmetic surgeries.`,
  helpTitle: `How Physiotherapy Can Help`,
  helpDescription: `Our post-surgical physiotherapy treatments are designed to support your body’s healing process and ensure optimal recovery. This includes:`,
  options: [
    {
      title: "Manual Lymphatic Drainage (MLD)",
      description: `A gentle, specialized technique to reduce swelling, improve circulation, and speed up healing.`,
    },
    {
      title: "Scar Management & Mobilization",
      description: `Techniques to soften scar tissue, improve flexibility, and minimize adhesions.`,
    },
    {
      title: "Electrotherapy & Heat Therapy",
      description: `Pain relief methods to promote comfort and tissue healing.`,
    },
    {
      title: "Soft Tissue & Myofascial Release",
      description: `Reducing muscle tension and improving mobility in affected areas.`,
    },
    {
      title: "Postural & Movement Guidance",
      description: `Helping you regain proper movement patterns and avoid strain during recovery.`,
    },
    {
      title: "Breathing & Relaxation Techniques",
      description: `Supporting overall well-being and reducing post-surgical stress.`,
    },
  ],
  image: physiotherapyImage.src,
};

const MedicalMassageTherapy = {
  title: "Medical Massage Therapy",
  description: `Medical massage therapy is a targeted, therapeutic approach designed to address specific musculoskeletal conditions, relieve pain, and promote overall healing. Unlike general relaxation massage, this treatment is based on evidence-based physiotherapy techniques to improve mobility, reduce tension, and support recovery from injuries or chronic conditions.`,
  helpTitle: `How Medical Massage Can Help`,
  helpDescription: `Medical massage is tailored to each individual’s needs, making it beneficial for:`,
  options: [
    {
      title: "Chronic Pain Relief",
      description: `Helps with conditions like back pain, neck pain, and joint stiffness.`,
    },
    {
      title: "Muscle Tension & Spasm Reduction",
      description: `Releases tight muscles, improving flexibility and movement.`,
    },
    {
      title: "Injury Recovery",
      description: ` Supports rehabilitation after sprains, strains, or sports injuries`,
    },
    {
      title: "Scar & Post-Surgical Healing",
      description: `Aids in softening scar tissue and improving circulation.`,
    },
    {
      title: "Headache & Migraine Management",
      description: `Reduces tension that may contribute to headaches.`,
    },
    {
      title: "Improved Posture & Mobility",
      description: `Addresses muscle imbalances and enhances movement patterns.`,
    },
  ],
  image: medicalMassageImage.src,
};

export { HeadacheMigraineData, TMJPhysiotherapy, WetCupping, PhysiotherapyData, MedicalMassageTherapy };
