import React, { useState } from 'react';
import { Copy, Check, MessageCircle, CreditCard, ShieldCheck } from 'lucide-react';

// ==========================================
// DATA REKENING RESMI ALDHO RENT CAR
// Edit data rekening dengan mudah di sini
// ==========================================
export const ACCOUNT_HOLDER = 'Ronni andi hutahaean';
export const BRI_ACCOUNT_NUMBER = '524801013975538';
export const MANDIRI_ACCOUNT_NUMBER = '1070018515389';
export const WA_CONFIRMATION_URL =
  'https://wa.me/6282272055155?text=Halo%20Aldho%20Rent%20Car,%20saya%20ingin%20konfirmasi%20transfer%20pembayaran%20sewa%20mobil.';

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoUrl: string;
  fallbackLogoUrl?: string;
}

const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bri',
    bankName: 'Bank BRI',
    accountNumber: BRI_ACCOUNT_NUMBER,
    accountHolder: ACCOUNT_HOLDER,
    logoUrl: '/images.svg',
    fallbackLogoUrl: '/images/BANK_BRI_logo.svg',
  },
  {
    id: 'mandiri',
    bankName: 'Bank Mandiri',
    accountNumber: MANDIRI_ACCOUNT_NUMBER,
    accountHolder: ACCOUNT_HOLDER,
    logoUrl: '/images/logo mandiri.jpeg',
    fallbackLogoUrl: '/images/logo mandiri.jpg',
  },
];

export default function BankAccounts() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section id="rekening" className="py-20 bg-slate-100 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-semibold uppercase tracking-wider mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Rekening Pembayaran Resmi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Metode Pembayaran Transfer Bank
          </h2>
        </div>

        {/* BANNER INFORMASI PEMILIK REKENING */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-blue-50/90 border border-blue-200 text-blue-950 shadow-sm flex items-start gap-3.5">
          <div className="p-2 bg-blue-100 rounded-xl text-blue-700 flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-blue-900">
            Berikut merupakan rekening resmi kami atas nama{' '}
            <span className="font-extrabold text-blue-950 bg-blue-100/90 px-2.5 py-0.5 rounded-md border border-blue-200 shadow-xs">
              {ACCOUNT_HOLDER}
            </span>
            . Setelah transfer, mohon segera konfirmasi pembayaran melalui admin WhatsApp.
          </p>
        </div>

        {/* DAFTAR KARTU REKENING BANK (Layout Horizontal Rapi & Responsif) */}
        <div className="space-y-4 mb-8">
          {BANK_ACCOUNTS.map((acc) => {
            const isCopied = copiedId === acc.id;
            return (
              <div
                key={acc.id}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* 1. Kotak Logo Bank */}
                <div className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-sm min-w-[110px] sm:w-[130px] flex justify-center items-center h-12 flex-shrink-0">
                  <img
                    src={acc.logoUrl}
                    alt={acc.bankName}
                    className="h-7 w-auto object-contain"
                    onError={(e) => {
                      if (acc.fallbackLogoUrl && e.currentTarget.src !== acc.fallbackLogoUrl) {
                        e.currentTarget.src = acc.fallbackLogoUrl;
                      }
                    }}
                  />
                </div>

                {/* 2. Kolom Nomor Rekening */}
                <div className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-2 text-center select-all flex flex-col justify-center">
                  <span className="font-mono text-base sm:text-lg font-semibold tracking-wider text-gray-800">
                    {acc.accountNumber}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    a.n. {acc.accountHolder} ({acc.bankName})
                  </span>
                </div>

                {/* 3. Tombol Copy */}
                <button
                  type="button"
                  onClick={() => handleCopy(acc.id, acc.accountNumber)}
                  className={`font-medium px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 text-sm min-w-[105px] active:scale-95 shadow-xs ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-900 hover:bg-blue-800 text-white'
                  }`}
                  aria-label={`Salin nomor rekening ${acc.bankName}`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* TOMBOL KONFIRMASI WHATSAPP */}
        <div className="text-center">
          <a
            href={WA_CONFIRMATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 text-base"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Konfirmasi Pembayaran via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
