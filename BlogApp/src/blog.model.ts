export interface PostDto {
  id: string;
  title: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
