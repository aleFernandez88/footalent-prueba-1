import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-[100vh]">
      <div className="flex items-center justify-center flex-col  h-full">
        <h1 id="hjjjjjeading" className="heading  text-4xl  font-bold mb-5">
          welcome to next.js!
        </h1>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-[var(--color-primary)] text-[var(--color-surface)] inline-block  px-5 py-1 text-xl font-medium rounded-2xl"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-[var(--color-primary)] text-[var(--color-surface)] inline-block  px-5 py-1 text-xl font-medium rounded-2xl"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
