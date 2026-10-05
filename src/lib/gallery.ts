import type { StaticImageData } from "next/image";

import p0 from "@/assets/photos/v01-05-solar-array-closeup.jpg";
import p1 from "@/assets/photos/v01-06-rooftop-array-house.jpg";
import p2 from "@/assets/photos/v01-07-rooftop-array-skyline.jpg";
import p3 from "@/assets/photos/v03-12-finished-array-wide-view.jpg";
import p4 from "@/assets/photos/v03-13-finished-array-low-angle.jpg";
import p5 from "@/assets/photos/v03-17-finished-array-villa.jpg";
import p6 from "@/assets/photos/v02-16-finished-array-side-view.jpg";
import p7 from "@/assets/photos/v02-17-finished-array-skyline.jpg";
import p8 from "@/assets/photos/v02-18-finished-array-wide.jpg";
import p9 from "@/assets/photos/v03-15-rooftop-view-sunset.jpg";
import p10 from "@/assets/photos/v08-01-finished-array-front.jpg";
import p11 from "@/assets/photos/v08-02-finished-array-side.jpg";
import p12 from "@/assets/photos/v08-03-finished-array-low-angle.jpg";
import p13 from "@/assets/photos/v07-02-rooftop-pergola-array-town-view.jpg";
import p14 from "@/assets/photos/v07-08-panel-canopy-blue-sky.jpg";
import p15 from "@/assets/photos/v07-09-pergola-structure-low-angle.jpg";
import p16 from "@/assets/photos/v07-10-bifacial-panels-closeup.jpg";
import p17 from "@/assets/photos/v07-11-bifacial-panels-wiring.jpg";
import p18 from "@/assets/photos/v09-01-pergola-array-side-view.jpg";
import p19 from "@/assets/photos/v09-03-array-top-over-terrace.jpg";
import p20 from "@/assets/photos/v09-06-pergola-underside-terrace.jpg";
import p21 from "@/assets/photos/v09-08-bifacial-underside-town-view.jpg";
import p22 from "@/assets/photos/v09-12-bifacial-underside-sky.jpg";
import p23 from "@/assets/photos/v01-02-panel-canopy-blue-sky.jpg";
import p24 from "@/assets/photos/v01-03-panel-canopy-low-angle.jpg";
import p25 from "@/assets/photos/v01-09-mounting-structure-from-below.jpg";
import p26 from "@/assets/photos/v03-14-mounting-structure-underside.jpg";
import p27 from "@/assets/photos/v08-09-bifacial-array-underside.jpg";
import p28 from "@/assets/photos/v08-11-structure-side-view.jpg";
import p29 from "@/assets/photos/v08-15-structure-bracing-wide.jpg";
import p30 from "@/assets/photos/v02-10-aerial-rooftop-before-installation.jpg";
import p31 from "@/assets/photos/v02-12-mounting-structure-aerial.jpg";
import p32 from "@/assets/photos/v07-03-aerial-array-over-terrace.jpg";
import p33 from "@/assets/photos/v07-04-aerial-array-side-view.jpg";
import p34 from "@/assets/photos/v07-05-aerial-array-wide.jpg";
import p35 from "@/assets/photos/v07-06-aerial-array-top-down.jpg";
import p36 from "@/assets/photos/v01-10-sungrow-inverter.jpg";
import p37 from "@/assets/photos/v02-20-sungrow-inverter-installed.jpg";
import p38 from "@/assets/photos/v03-24-sungrow-inverter-protection-boxes.jpg";
import p39 from "@/assets/photos/v07-12-sungrow-inverters-cabinet.jpg";
import p40 from "@/assets/photos/v07-14-sungrow-inverter-closeup.jpg";
import p41 from "@/assets/photos/v09-15-sungrow-inverter-protection-boxes.jpg";
import p42 from "@/assets/photos/v10-06-sofar-inverter-protection-boxes.jpg";
import p43 from "@/assets/photos/v10-08-two-sofar-inverters-closeup.jpg";

export type GalleryCategory = "toitures" | "pergolas" | "structures" | "aerien" | "onduleurs";

export const GALLERY_FILTERS: { id: "all" | GalleryCategory; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "toitures", label: "Toitures" },
  { id: "pergolas", label: "Pergolas" },
  { id: "structures", label: "Structures" },
  { id: "aerien", label: "Vues aériennes" },
  { id: "onduleurs", label: "Onduleurs" },
];

export const GALLERY: { src: StaticImageData; cat: GalleryCategory; alt: string }[] = [
  { src: p0, cat: "toitures", alt: "Panneaux solaires en gros plan sur un toit-terrasse" },
  { src: p1, cat: "toitures", alt: "Panneaux solaires sur le toit d’une maison blanche" },
  { src: p2, cat: "toitures", alt: "Champ de panneaux solaires avec les toits de la ville au fond" },
  { src: p3, cat: "toitures", alt: "Installation terminée, vue large sur un toit" },
  { src: p4, cat: "toitures", alt: "Panneaux solaires vus en contre-plongée" },
  { src: p5, cat: "toitures", alt: "Installation de panneaux sur le toit d’une villa" },
  { src: p6, cat: "toitures", alt: "Panneaux solaires inclinés vus de côté" },
  { src: p7, cat: "toitures", alt: "Grande installation inclinée avec la ville en arrière-plan" },
  { src: p8, cat: "toitures", alt: "Panneaux solaires sur un toit-terrasse, vue large" },
  { src: p9, cat: "toitures", alt: "Toits au coucher du soleil, panneau solaire au premier plan" },
  { src: p10, cat: "toitures", alt: "Installation terminée vue de face sous un ciel bleu" },
  { src: p11, cat: "toitures", alt: "Rangées de panneaux solaires vues de côté" },
  { src: p12, cat: "toitures", alt: "Panneaux solaires en contre-plongée" },
  { src: p13, cat: "pergolas", alt: "Pergola solaire sur une terrasse, vue sur la ville" },
  { src: p14, cat: "pergolas", alt: "Dessous d’une pergola de panneaux sous un ciel bleu" },
  { src: p15, cat: "pergolas", alt: "Structure de pergola solaire en contre-plongée" },
  { src: p16, cat: "pergolas", alt: "Panneaux bifaciaux vus de dessous" },
  { src: p17, cat: "pergolas", alt: "Câblage sous des panneaux bifaciaux" },
  { src: p18, cat: "pergolas", alt: "Pergola solaire sur une terrasse carrelée" },
  { src: p19, cat: "pergolas", alt: "Panneaux au-dessus d’une terrasse" },
  { src: p20, cat: "pergolas", alt: "Dessous de la pergola au-dessus d’une terrasse" },
  { src: p21, cat: "pergolas", alt: "Panneaux bifaciaux vus de dessous avec la ville au fond" },
  { src: p22, cat: "pergolas", alt: "Panneaux bifaciaux vus de dessous sous un ciel dégagé" },
  { src: p23, cat: "structures", alt: "Auvent de panneaux solaires sous un ciel bleu" },
  { src: p24, cat: "structures", alt: "Auvent de panneaux en contre-plongée" },
  { src: p25, cat: "structures", alt: "Structure de fixation vue de dessous" },
  { src: p26, cat: "structures", alt: "Dessous de la structure métallique des panneaux" },
  { src: p27, cat: "structures", alt: "Structure et panneaux bifaciaux vus de dessous" },
  { src: p28, cat: "structures", alt: "Structure de support vue de côté" },
  { src: p29, cat: "structures", alt: "Contreventement de la structure métallique" },
  { src: p30, cat: "aerien", alt: "Vue aérienne d’un toit-terrasse avant l’installation" },
  { src: p31, cat: "aerien", alt: "Vue aérienne d’une structure en cours de montage" },
  { src: p32, cat: "aerien", alt: "Vue aérienne de panneaux au-dessus d’une terrasse" },
  { src: p33, cat: "aerien", alt: "Vue aérienne de panneaux, de côté" },
  { src: p34, cat: "aerien", alt: "Vue aérienne large d’une installation" },
  { src: p35, cat: "aerien", alt: "Installation vue du dessus" },
  { src: p36, cat: "onduleurs", alt: "Onduleur Sungrow fixé au mur" },
  { src: p37, cat: "onduleurs", alt: "Onduleur Sungrow installé" },
  { src: p38, cat: "onduleurs", alt: "Onduleur Sungrow et coffrets de protection" },
  { src: p39, cat: "onduleurs", alt: "Deux onduleurs Sungrow dans un coffret technique" },
  { src: p40, cat: "onduleurs", alt: "Onduleur Sungrow en gros plan" },
  { src: p41, cat: "onduleurs", alt: "Onduleur Sungrow au-dessus de ses coffrets de protection" },
  { src: p42, cat: "onduleurs", alt: "Onduleur Sofar et coffrets de protection" },
  { src: p43, cat: "onduleurs", alt: "Deux onduleurs Sofar installés au mur" },
];
