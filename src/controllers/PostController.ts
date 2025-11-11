

import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

//게시글 수정
export const updatePost = async (req: Request, res: Response) => {
    const { title, content,id} = req.body;
    const post = await prisma.post.update({
        where: { id: Number(id) },
        data: { title, content, updatedAt: new Date() },
    });
    res.status(200).json({
        message: '게시글 수정 성공',
        success: true,
        data: post,
    });
};

//게시글 삭제
export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await prisma.post.delete({
        where: { id: Number(id) },
    });
    res.status(200).json({
        message: '게시글 삭제 성공',
        success: true,
        data: post,
    });
};


//게시글 작성 API
export const createPost = async (req: Request, res: Response) => {
    const { title, content, userId } = req.body;
    const post = await prisma.post.create({
        data: {
            title,
            content,
            user_id: BigInt(userId),
            created_at: new Date(),
            updatedAt: new Date(),
        },
    });
    res.status(201).json({
        success: true,
        message: '게시글 작성 성공',
        data: post,
    });
};


//게시글 조회 API
export const getPosts = async (req: Request, res: Response) => {
    const { page, size } = req.query;
    const posts = await prisma.post.findMany({
        skip: (Number(page) - 1) * Number(size),
        take: Number(size),
        orderBy: {
            created_at: 'desc',
        },
    });
    res.status(200).json(posts);
};