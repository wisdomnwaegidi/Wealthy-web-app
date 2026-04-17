export interface EachQuestions {
  id: number;
  text: string;
  answers: string[];
  correctAnswer: number;
}

export const examQuestions: EachQuestions[] = [
  {
    id: 1,
    text: "1. What is the capital of France?",
    answers: ["Paris", "Moscow", "Lagos", "Texas"],
    correctAnswer: 0,
  },
  {
    id: 2,
    text: "2. Who wrote the play 'Romeo and Juliet'?",
    answers: [
      "J.K Rowling",
      "None of the above",
      "William Shakespeare",
      "Chinua Achebe",
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    text: "3. Who was the first person to set foot on the moon?",
    answers: [
      "Thomas Eddison",
      "Neil Armstrong",
      "Leonardo da Vinci",
      "Branson Wick",
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    text: "4. What is the chemical formula of gold?",
    answers: ["AU", "None of the above", "H2O", "CA"],
    correctAnswer: 0,
  },
  {
    id: 5,
    text: "5. Who painted the Mona Lisa potrait?",
    answers: [
      "Charles Darwin",
      "Leonardo da Vinci",
      "isaac Newton",
      "J.K Rowling",
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    text: "6. How do you say 'Hello' in Spanish?",
    answers: ["Holla", "Un Hombre", "Hila", "Hello"],
    correctAnswer: 0,
  },
  {
    id: 7,
    text: "7. What is the formula for calculating the area of a rectangle?",
    answers: ["A = (L x W)", "A = (W x B)", "A = (L x B)", "A = (B x W)"],
    correctAnswer: 0,
  },
  {
    id: 8,
    text: "8. Who is the current president of the United States of America?",
    answers: ["Donald Trump", "Barrack Obama", "George Bush", "Joe Biden"],
    correctAnswer: 0,
  },
  {
    id: 9,
    text: "9. Plants make their food through a process called?",
    answers: ["Respiration", "Oxidization", "Transpilation", "Photosynthesis"],
    correctAnswer: 3,
  },
  {
    id: 10,
    text: "10. What is the tallest mountain in the world?",
    answers: [
      "Mount Carmel",
      "Mount Sinai",
      "Mount Everest",
      "Mount Kilimanjaro",
    ],
    correctAnswer: 2,
  },
  {
    id: 11,
    text: "11. What gas do plants absorb from the atmosphere during photosynthesis?",
    answers: ["Carbon Dioxide", "Oxygen", "Potassuim", "Nitrogen"],
    correctAnswer: 0,
  },
  {
    id: 12,
    text: "12. What is the chemical symbol of water?",
    answers: ["CO3", "PA", "AU", "H2O"],
    correctAnswer: 3,
  },
  {
    id: 13,
    text: "13. Who is the author of the Harry Potter series?",
    answers: [
      "Russells Adam",
      "J.K. Rowling",
      "Brian McDowell",
      "None of the above",
    ],
    correctAnswer: 1,
  },
  {
    id: 14,
    text: "14. What are the primary colors?",
    answers: [
      "Red, Blue, Yellow",
      "Green, Black, White",
      "Orange, Brown, Purple",
      "Violet, Pink, White",
    ],
    correctAnswer: 0,
  },
  {
    id: 15,
    text: "15. What is the largest planet in our solar system?",
    answers: ["Mars", "Earth", "Saturn", "Jupiter"],
    correctAnswer: 3,
  },
  {
    id: 16,
    text: "16. What is the freezing point of water?",
    answers: ["20°C", "0°C", "40°C", "50°C"],
    correctAnswer: 1,
  },
  {
    id: 17,
    text: "17. What is the primary function of the heart?",
    answers: [
      "None of the above",
      "To stop blood",
      "To pump and circulate blood",
      "To drain blood",
    ],
    correctAnswer: 2,
  },
  {
    id: 18,
    text: "18. What is the boiling point of water in Celcuis?",
    answers: ["212 Degrees", "200 Degrees", "205 Degrees", "213 Degrees"],
    correctAnswer: 0,
  },
  {
    id: 19,
    text: "19. Who is the first president of Nigeria?",
    answers: [
      "Obafemi Awolowo",
      "Nnamdi Azikiwe",
      "Essien Thompson",
      "Ahmadu Bello",
    ],
    correctAnswer: 1,
  },
  {
    id: 20,
    text: "20. What is the capital of Japan?",
    answers: ["Athens", "Tokyo", "New Jersey", "Abuja"],
    correctAnswer: 1,
  },
];
