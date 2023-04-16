import { InjectModel } from "@nestjs/mongoose";
import { PostDto } from "./blog.model";
import { Model } from "mongoose";
import { Blog, BlogDocument } from "./blog.schema";
import { Injectable } from "@nestjs/common/decorators";

export interface BlogRepository {
  getAllPost(): Promise<Blog[]>;
  createPost(postDto: PostDto);
  getPost(id: string): Promise<PostDto>;
  deletePost(id: string);
  updatePost(id: string, postDto: PostDto);
}

@Injectable()
export class BlogMongoRepository implements BlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  //파일을 읽어서 모든 게시글 불러오기
  async getAllPost(): Promise<Blog[]> {
    return await this.blogModel.find().exec();
  }

  //게시글 쓰기
  async createPost(postDto: PostDto) {
    const createPost = {
      ...postDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogModel.create(createPost);
  }

  async getPost(id: string): Promise<PostDto> {
    return await this.blogModel.findById(id);
  }

  async deletePost(id: string) {
    await this.blogModel.findByIdAndDelete(id);
  }

  async updatePost(id: string, postDto: PostDto) {
    const updatePost = { id, ...postDto, updatedAt: new Date() };
    this.blogModel.findByIdAndUpdate(id, updatePost);
  }
}
