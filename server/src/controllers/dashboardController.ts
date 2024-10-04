
import {Request, Response} from "express";
import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient

export const getDashboardMetrics = async (req: Request, res:Response): Promise<void> => {
    try {
        const popularProducts = await prisma.products.findMany({
            take: 15,
            orderBy: {
               stockQuantity: Prisma.SortOrder.desc,
            },
        });
        const salesSummary = await prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: Prisma.SortOrder.desc,
            },
        });
        const purchaseSummary = await prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: Prisma.SortOrder.desc
            },
        });
        const expenseSummary = await prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: Prisma.SortOrder.desc,
            },
        });
        const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: Prisma.SortOrder.desc,
            },
        });
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
            (item) => ({
                ...item,
                amount: item.amount.toString()
            })
        )

        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary
        })

    }catch (error){
        res.status(500).json({message: 'Error retrieving dashboard metrics'})
    }
}