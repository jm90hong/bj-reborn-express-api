import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


//회원가입 API
export const signup = async (req: Request, res: Response) => {
    const { email, pw, name } = req.body;

    //유효성 검사
    if (!email || !pw || !name) {
        return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
    }

    //이메일 형식 검사
    if (!email.includes('@')) {
        return res.status(400).json({ error: '이메일 형식이 올바르지 않습니다.' });
    }
    


    const user = await prisma.user.create({
        data: {
            email,
            pw,
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
    res.status(201).json({
        message: '회원가입 성공',
        success: true,
        data: user,
    });
};


//로그인 API
export const login = async (req: Request, res: Response) => {
    const { email, pw } = req.body;
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        return res.status(401).json({ error: '존재하지 않는 이메일입니다.' });
    }
    if (user.pw !== pw) {
        return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }
    res.status(200).json({
        message: '로그인 성공',
        success: true,
        data: user,
    });
};


//회원리스트 페이지네이션
export const getUsers = async (req: Request, res: Response) => {
    const { page, size } = req.query;
    const users = await prisma.user.findMany({
        skip: (Number(page) - 1) * Number(size),
        take: Number(size),
        orderBy: {
            createdAt: 'desc',
        },
    });
    res.status(200).json(users);
};


//회원정보 수정