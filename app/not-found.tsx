import { ExclamationCircleFilled } from "@ant-design/icons";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      {/* Gambar laptop dan ikon */}
       {/* Icon untuk 404 */}
      <div className="text-6xl text-blue-500 mb-6">
        <ExclamationCircleFilled />
      </div>

      {/* 404 text */}
      <h1 className="text-6xl font-extrabold text-blue-500">404</h1>
      <p className="text-lg text-gray-500 mb-6">
        Page Not Found
      </p>
      <p className="text-sm text-gray-400 mb-8">
        We are sorry, the page you requested could not be found. Please go back to the homepage.
      </p>

      {/* Tombol kembali ke halaman utama */}
      <Link href="/" className="px-6 py-2 rounded-full bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition">
        Go Home
      </Link>
    </div>
  );
}