import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    const fakeUser = {
        id: id,
        name: "John Doe",
        email: "2sK3G@example.com",
        role: "USER"        
    };

    try {
        return NextResponse.json(fakeUser, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}