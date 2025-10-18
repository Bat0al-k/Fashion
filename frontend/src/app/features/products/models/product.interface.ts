export interface Product {
  _id: string;
 name: string;
  price: number;
  image: string;
 images?: string[];
  rating: number;
  instock: number;            
  istrending :boolean;
  description?: string;
  sizes: string[];             
  colors: string[];            
  defaultColor?: string;
  defaultSize?: string;
  category?: string;
  subcategory?: string;
}