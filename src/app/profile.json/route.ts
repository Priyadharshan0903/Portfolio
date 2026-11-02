import { getProfile } from "@/lib/discovery";

export const dynamic = "force-static";

export function GET() {
  return new Response(`${JSON.stringify(getProfile(), null, 2)}\n`, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
