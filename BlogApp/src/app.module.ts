import { Module } from "@nestjs/common";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { BlogMongoRepository } from "./blog.repository";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { Blog, BlogSchema } from "./blog.schema";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://sun:rnrdj123@cluster0.bnw7dez.mongodb.net/nestjs_blog"
    ),

    //스키마설정
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogMongoRepository], //injectable 붙였으므로 프로바이더가 되었습니다.
})
export class AppModule {}
