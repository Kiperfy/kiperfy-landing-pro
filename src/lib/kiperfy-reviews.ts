export type Review = {
  id: string;
  name: string;
  quote: { es: string; en: string };
};

export const REVIEWS: Review[] = [
  {
    id: "carlos",
    name: "Carlos Méndez",
    quote: {
      es: "Me encanta lo fácil que es usar la app. Todo está muy claro y tenemos mejor control del propiedad. Excelente herramienta",
      en: "I love how easy the app is to use. Everything is clear and we have better control of the property. Excellent tool",
    },
  },
  {
    id: "ana",
    name: "Ana López",
    quote: {
      es: "Muy buena aplicación, nos ayuda a mantener todo organizado y con mayor transparencia",
      en: "A great app that helps us stay organized with more transparency",
    },
  },
  {
    id: "luis",
    name: "Luis Herrera",
    quote: {
      es: "Súper intuitiva y práctica. Ahora todo el propiedad está mejor comunicado",
      en: "Super intuitive and practical. The whole property is better connected now",
    },
  },
  {
    id: "mariana",
    name: "Mariana Torres",
    quote: {
      es: "Excelente app, facilita mucho la administración y la comunicación con los propietarios",
      en: "Excellent app — it makes administration and owner communication much easier",
    },
  },
  {
    id: "jorge",
    name: "Jorge Ramírez",
    quote: {
      es: "Muy útil para ver pagos, accesos y avisos en un solo lugar",
      en: "Very useful to see payments, access and notices in one place",
    },
  },
  {
    id: "fernanda",
    name: "Fernanda Cruz",
    quote: {
      es: "Me gusta mucho lo ordenada que es. Todo está al alcance en segundos",
      en: "I love how organized it is. Everything is within reach in seconds",
    },
  },
  {
    id: "ricardo",
    name: "Ricardo Gómez",
    quote: {
      es: "Gran solución para el control del propiedad. Todo más claro y transparente",
      en: "A great solution for property control. Everything is clearer and more transparent",
    },
  },
  {
    id: "daniela",
    name: "Daniela Vargas",
    quote: {
      es: "Muy práctica, ya no dependemos de WhatsApp para todo",
      en: "Very practical — we no longer depend on WhatsApp for everything",
    },
  },
  {
    id: "pablo",
    name: "Pablo Reyes",
    quote: {
      es: "Excelente implementación, ahora todo fluye mejor en la administración",
      en: "Excellent rollout — administration flows much better now",
    },
  },
  {
    id: "sofia",
    name: "Sofía Castillo",
    quote: {
      es: "Muy buena app, fácil de usar y con muchas funcionalidades útiles",
      en: "A very good app, easy to use with many useful features",
    },
  },
  {
    id: "andres",
    name: "Andrés Navarro",
    quote: {
      es: "Me encanta poder ver todo lo que pasa en la propiedad en tiempo real",
      en: "I love being able to see everything that happens on the property in real time",
    },
  },
];

/** Featured carousel opens on Andrés (Framer hero quote). */
export const FEATURED_REVIEW_INDEX = REVIEWS.findIndex((r) => r.id === "andres");
