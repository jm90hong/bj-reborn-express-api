import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 아이템 생성
export const createItem = async (req: Request, res: Response) => {
    const { name, content, imageUrl, price } = req.body;

    const item = await prisma.item.create({
        data: {
            name,
            content,
            image_url: imageUrl,
            price: BigInt(price),
            updatedAt: new Date(),
        },
    });

    res.status(201).json({
        success: true,
        message: '아이템 생성 성공',
        data: item,
    });
};

// 아이템 수정
export const updateItem = async (req: Request, res: Response) => {
    const { id, name, content, imageUrl, price } = req.body;

    const item = await prisma.item.update({
        where: { id: BigInt(id) },
        data: {
            ...(name !== undefined ? { name } : {}),
            ...(content !== undefined ? { content } : {}),
            ...(imageUrl !== undefined ? { image_url: imageUrl } : {}),
            ...(price !== undefined ? { price: BigInt(price) } : {}),
            updatedAt: new Date(),
        },
    });

    res.status(200).json({
        success: true,
        message: '아이템 수정 성공',
        data: item,
    });
};

// 아이템 삭제
export const deleteItem = async (req: Request, res: Response) => {
    const { id } = req.params;

    const item = await prisma.item.delete({
        where: { id: BigInt(id) },
    });

    res.status(200).json({
        success: true,
        message: '아이템 삭제 성공',
        data: item,
    });
};

// 아이템 목록 조회
export const getItems = async (req: Request, res: Response) => {
    const { page = '1', size = '10' } = req.query;

    const items = await prisma.item.findMany({
        skip: (Number(page) - 1) * Number(size),
        take: Number(size),
        orderBy: {
            created_at: 'desc',
        },
    });

    res.status(200).json(items);
};

