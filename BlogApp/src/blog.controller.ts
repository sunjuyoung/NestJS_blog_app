import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
} from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller("blog")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  getAllPosts() {
    return this.blogService.getAllPosts();
  }

  @Post()
  createPost(@Body() postDto) {
    this.blogService.createPost(postDto);
    return "success";
  }

  @Get("/:id")
  async getPost(@Param("id") id: string) {
    const post = await this.blogService.getPost(id);
    return post;
  }

  @Delete("/:id")
  deletePost(@Param("id") id: string) {
    this.blogService.deletePost(id);
    return "success";
  }

  @Put("/:id")
  updatePost(@Param("id") id: string, @Body() postDto) {
    return this.blogService.updatePost(id, postDto);
  }
}
