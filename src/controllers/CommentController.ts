import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

// 댓글 작성
export const createComment = async (req: Request, res: Response) => {
    const { content, userId, postId } = req.body;

    const comment = await prisma.comment.create({
        data: {
            content,
            user_id: BigInt(userId),
            post_id: BigInt(postId),
        },
    });

    res.status(201).json({
        success: true,
        message: '댓글 작성 성공',
        data: comment,
    });
};

// 댓글 수정
export const updateComment = async (req: Request, res: Response) => {
    const { id, content } = req.body;

    const comment = await prisma.comment.update({
        where: { id: BigInt(id) },
        data: { content },
    });

    res.status(200).json({
        success: true,
        message: '댓글 수정 성공',
        data: comment,
    });
};

// 댓글 삭제
export const deleteComment = async (req: Request, res: Response) => {
    const { id } = req.params;

    const comment = await prisma.comment.delete({
        where: { id: BigInt(id) },
    });

    res.status(200).json({
        success: true,
        message: '댓글 삭제 성공',
        data: comment,
    });
};

// 댓글 조회 (옵션: 게시글별, 페이지네이션)
export const getComments = async (req: Request, res: Response) => {
    const { postId, page = '1', size = '10' } = req.query;

    const comments = await prisma.comment.findMany({
        where: postId ? { post_id: BigInt(postId as string) } : undefined,
        skip: (Number(page) - 1) * Number(size),
        take: Number(size),
        orderBy: {
            created_at: 'desc',
        },
    });

    res.status(200).json(comments);
};

