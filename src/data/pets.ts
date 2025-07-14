export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  type: 'dog' | 'cat' | 'bird' | 'fish';
  image: string;
  description: string;
}

export const PETS_DATA: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    type: 'dog',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300',
    description: 'Friendly and energetic dog, loves to play fetch.',
  },
  {
    id: '2',
    name: 'Whiskers',
    breed: 'Persian',
    age: 2,
    type: 'cat',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300',
    description: 'Calm and affectionate cat, enjoys sunny spots.',
  },
  {
    id: '3',
    name: 'Charlie',
    breed: 'Beagle',
    age: 5,
    type: 'dog',
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=300',
    description: 'Loyal companion, great with kids.',
  },
  {
    id: '4',
    name: 'Luna',
    breed: 'Siamese',
    age: 1,
    type: 'cat',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300',
    description: 'Playful kitten, very curious about everything.',
  },
  {
    id: '5',
    name: 'Max',
    breed: 'Labrador',
    age: 4,
    type: 'dog',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300',
    description: 'Gentle giant, loves swimming and outdoor activities.',
  },
];