import { prisma } from "@/lib/prisma";

async function main() {
    await prisma.transaction.create({
        data:{
            amount: 10000,
            description: "cooffe",
            date: new Date,
            type: "expense",
            category: "work",
            userId:"cmggfv71v0000i02koecer6pc"
        }
    })

    console.log("seed success");
    
}

main().catch((e) => {
    console.log(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})