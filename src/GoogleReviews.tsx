import React from 'react';
import { Star, CheckCircle2, ExternalLink, PenLine } from 'lucide-react';

export interface ReviewItem {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  timeAgo?: string;
  url?: string;
  comment: string;
}

const GOOGLE_MAPS_REVIEW_URL = 'https://maps.app.goo.gl/9ck3G454ca71udGZ8';

const REVIEWS: ReviewItem[] = [
  {
    id: '1',
    name: 'Renta Manurung',
    initials: 'RM',
    avatarColor: 'bg-emerald-600',
    rating: 5,
    timeAgo: 'Google Maps',
    url: 'https://maps.app.goo.gl/id8BoGm5y3uj5iSP8',
    comment: 'Pelayanan nya bagus dan pastinya sangat nyaman',
  },
  {
    id: '2',
    name: 'renungan rajagukguk',
    initials: 'RR',
    avatarColor: 'bg-blue-600',
    rating: 5,
    timeAgo: 'Google Maps',
    url: 'https://maps.app.goo.gl/mn4xDc5oi4j5zRpr8',
    comment: 'Pelayanan sangat baik, ramah,\nMobil bersih dan nyaman selama perjalanan',
  },
  {
    id: '3',
    name: 'Veloxa Zoya',
    initials: 'VZ',
    avatarColor: 'bg-purple-600',
    rating: 5,
    timeAgo: 'Google Maps',
    url: 'https://maps.app.goo.gl/L2EWST4pgAFyD2CA9',
    comment: 'Pengalaman terbaik memakai jasa aldho rental car..Mobilnya bersih, dan nyaman. Supirnya Ramah. Owner-nya juga sangat baik.',
  },
  {
    id: '4',
    name: 'Salsa Hany Saputri',
    initials: 'SH',
    avatarColor: 'bg-amber-600',
    rating: 5,
    timeAgo: 'Google Maps',
    url: 'https://maps.app.goo.gl/cKQmjSo3SPuHkMwi9',
    comment: 'Pengalaman sangat baik, dan murah',
  },
  {
    id: '5',
    name: 'Lailil Qasos',
    initials: 'LQ',
    avatarColor: 'bg-rose-600',
    rating: 5,
    timeAgo: 'Google Maps',
    url: 'https://maps.app.goo.gl/QPqRwkNLSyjRTT3W7',
    comment: 'Pengalaman sangat baik, dan murah Driver ramah',
  },
];

function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function GoogleReviews() {
  return (
    <section id="ulasan" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER & RINGKASAN */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">
            <GoogleIcon className="w-4 h-4" />
            <span>Google Reviews Terverifikasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Apa Kata Pelanggan Aldho Rent Car?
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Kepuasan pelanggan adalah prioritas utama kami dalam setiap perjalanan di Silangit &amp; kawasan Danau Toba.
          </p>

          {/* Rating Summary Card & Tombol Tulis Ulasan */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center gap-3 bg-white px-5 py-3.5 rounded-2xl shadow-sm border border-slate-200">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center shadow-inner">
                <GoogleIcon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-900 leading-none">5.0</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-xs font-medium text-slate-500 mt-1">
                  Berdasarkan <span className="font-bold text-slate-700">16 ulasan</span> di Google Maps (
                  <a
                    href={GOOGLE_MAPS_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-600 hover:text-amber-700 underline inline-flex items-center gap-0.5"
                  >
                    Lihat
                    <ExternalLink className="w-3 h-3 inline" />
                  </a>
                  )
                </div>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 text-sm"
            >
              <PenLine className="w-4 h-4" />
              <span>Tulis Ulasan Anda</span>
            </a>
          </div>
        </div>

        {/* DAFTAR KARTU ULASAN (Grid Responsif 1 col mobile, 3 cols desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Kartu Pengulas */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-full ${review.avatarColor} text-white font-bold text-sm flex items-center justify-center shadow-sm flex-shrink-0`}
                    >
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 capitalize">
                        {review.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Pengulas Terverifikasi</span>
                      </div>
                    </div>
                  </div>
                  <GoogleIcon className="w-4 h-4 flex-shrink-0 opacity-80" />
                </div>

                {/* Rating Bintang */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Komentar */}
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Footer Kartu */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={review.url || GOOGLE_MAPS_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-amber-600 hover:text-amber-700 transition-colors hover:underline"
                >
                  <span>Lihat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
