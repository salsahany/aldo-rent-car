import React, { useState, useMemo } from 'react';
import {
  Phone, MapPin, Clock, Car, UserCheck, ShieldCheck, Compass, CheckCircle2, Users, Fuel,
  Settings, Menu, X, ExternalLink, MessageCircle, HelpCircle, Sparkles, ArrowRight,
} from 'lucide-react';

interface CarUnit {
  id: string; name: string; category: 'family' | 'premium' | 'group';
  image?: string; pos?: string; zoom?: number;
  capacity: number; transmission: string; fuel: string;
  priceDriver: number; priceSelfDrive?: number; allIn?: boolean; popular?: boolean; features: string[];
}

const B = import.meta.env.BASE_URL;
const PHONE_NUMBER = '6282272055155';
const PHONE_DISPLAY = '0822-7205-5155';
const ADDRESS = 'Jl. PK Hepata No. 4, Simpang Sirongit';
const MAP_QUERY = encodeURIComponent('Jl. Pk Hepata No. 4 Simpang Sirongit, Tapanuli Utara');
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
const LOGO = B + 'images/logo.jpg';

// Harga dalam rupiah per hari. Ubah di sini jika ada perubahan tarif.
const FLEET: CarUnit[] = [
  { id: 'innova', name: 'Toyota Kijang Innova', category: 'family', image: B + 'images/innova.jpg', pos: '50% 31%',
    capacity: 7, transmission: 'Manual / Matic', fuel: 'Bensin / Diesel', priceDriver: 700000, priceSelfDrive: 500000, popular: true,
    features: ['AC Double Blower', 'Nyaman Rute Jauh', 'Kabin Luas', 'Cocok Keluarga'] },
  { id: 'avanza', name: 'Toyota Avanza', category: 'family', image: B + 'images/hiace-1.jpg', pos: '0% 50%', zoom: 1.9,
    capacity: 7, transmission: 'Manual / Matic', fuel: 'Bensin', priceDriver: 500000, priceSelfDrive: 300000, popular: true,
    features: ['Irit BBM', 'Ideal Keluarga', 'Mudah Dikemudikan', 'Harga Bersahabat'] },
  { id: 'rush', name: 'Toyota Rush', category: 'family',
    capacity: 7, transmission: 'Manual / Matic', fuel: 'Bensin', priceDriver: 550000, priceSelfDrive: 350000,
    features: ['Ground Clearance Tinggi', 'Nyaman Medan Berkelok', 'Irit BBM', 'Cocok Wisata'] },
  { id: 'sigra', name: 'Daihatsu Sigra', category: 'family', image: B + 'images/sigra.jpg', pos: '50% 58%',
    capacity: 7, transmission: 'Manual / Matic', fuel: 'Bensin', priceDriver: 500000, priceSelfDrive: 300000,
    features: ['Sangat Irit', 'Mudah Parkir', 'Ekonomis', 'Cocok Dalam Kota'] },
  { id: 'fortuner', name: 'Toyota Fortuner', category: 'premium',
    capacity: 7, transmission: 'Automatic', fuel: 'Diesel', priceDriver: 1400000, allIn: true,
    features: ['Suspensi Nyaman', 'Interior Mewah', 'Gagah & Elegan', 'Paket All-In'] },
  { id: 'hiace', name: 'Toyota HiAce', category: 'group', image: B + 'images/hiace-2.jpg', pos: '50% 60%',
    capacity: 14, transmission: 'Manual', fuel: 'Diesel', priceDriver: 1500000, allIn: true, popular: true,
    features: ['Kapasitas Besar', 'Kabin Luas & Tinggi', 'Cocok Rombongan', 'Paket All-In'] },
  { id: 'hiace-premio', name: 'Toyota HiAce Premio', category: 'group', image: B + 'images/hiace-1.jpg', pos: '85% 50%',
    capacity: 14, transmission: 'Manual', fuel: 'Diesel', priceDriver: 1500000, allIn: true,
    features: ['Tampilan Premium', 'AC Menyeluruh', 'Cocok Tour Wisata', 'Paket All-In'] },
];

const ROUTES: [string, number][] = [
  ['Silangit – Balige', 200000], ['Silangit – Silimbat', 250000], ['Silangit – Porsea', 250000],
  ['Silangit – Dolok Sanggul', 250000], ['Silangit – Tarutung', 250000], ['Silangit – Parapat', 500000],
  ['Silangit – Samosir', 600000], ['Silangit – Sidikkang', 600000], ['Silangit – Sibolga', 700000],
  ['Silangit – Sidempuan', 800000],
];

const rp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');
const waLink = (m: string) => `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(m)}`;
const inputCls = 'w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm outline-none bg-white transition-all';
const labelCls = 'block text-xs font-semibold text-slate-700 uppercase mb-1';

const NAV = [['#armada', 'Armada Kami'], ['#layanan', 'Layanan Utama'], ['#keunggulan', 'Keunggulan & Rute'], ['#estimasi', 'Hitung Harga'], ['#lokasi', 'Lokasi & Kontak']];

const SERVICES = [
  { icon: Car, t: 'Sewa Mobil + Driver', d: 'Perjalanan santai tanpa lelah dengan sopir lokal yang paham rute.', l: ['Tepat waktu & sopan', 'Bebas stres navigasi'] },
  { icon: UserCheck, t: 'Rental Lepas Kunci', d: 'Kebebasan berkendara pribadi bersama keluarga atau kolega.', l: ['Privasi maksimal', 'Proses verifikasi cepat'] },
  { icon: Compass, t: 'ARC Travel & Tour', d: 'Antar wisata area Danau Toba, Balige, Parapat, Samosir, dan sekitarnya.', l: ['Rute fleksibel', 'Rekomendasi tempat lokal'] },
  { icon: Clock, t: 'Antar-Jemput Bandara', d: 'Layanan drop-off atau pick-up dari/ke Bandara Silangit dan sekitarnya.', l: ['Sesuai jadwal penerbangan', 'Tinggal chat WhatsApp'] },
];

function Logo({ size = 'h-12' }: { size?: string }) {
  return <img src={LOGO} alt="ARC Travel and Tour" className={`${size} w-auto rounded-xl bg-white p-0.5 shadow-md object-contain`} />;
}

function CarPhoto({ car }: { car: CarUnit }) {
  if (!car.image)
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 flex flex-col items-center justify-center text-slate-400 gap-2">
        <Car className="w-12 h-12" /><span className="text-xs">Foto segera ditambahkan</span>
      </div>
    );
  return (
    <div className="w-full h-full overflow-hidden">
      <img src={car.image} alt={car.name} loading="lazy" className="w-full h-full object-cover"
        style={{ objectPosition: car.pos, transform: car.zoom ? `scale(${car.zoom})` : undefined, transformOrigin: car.pos?.split(' ').join(' ') }} />
    </div>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [cat, setCat] = useState('all');
  const [calcCar, setCalcCar] = useState(FLEET[0].id);
  const [calcService, setCalcService] = useState<'driver' | 'self'>('driver');
  const [days, setDays] = useState(1);

  const genericWa = waLink('Halo Aldo Rent Car (ARC Travel & Tour), saya ingin bertanya mengenai ketersediaan dan daftar harga sewa mobil.');
  const cars = useMemo(() => (cat === 'all' ? FLEET : FLEET.filter((c) => c.category === cat)), [cat]);
  const cc = useMemo(() => FLEET.find((c) => c.id === calcCar) || FLEET[0], [calcCar]);
  const service = cc.priceSelfDrive ? calcService : 'driver';
  const total = (service === 'driver' ? cc.priceDriver : cc.priceSelfDrive!) * days;
  const calcWa = waLink(`Halo Aldo Rent Car, saya ingin booking:\n\n- Unit: ${cc.name}\n- Layanan: ${service === 'driver' ? (cc.allIn ? 'All-In (mobil, sopir, BBM)' : 'Dengan Sopir') : 'Lepas Kunci'}\n- Durasi: ${days} Hari\n- Est. Total: ${rp(total)}\n\nApakah unit ini ready? Terima kasih.`);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-400 selection:text-slate-900 pb-20 md:pb-0">
      {/* TOP BAR */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-400" />{ADDRESS}</span>
          <a href={`tel:+${PHONE_NUMBER}`} className="hover:text-amber-400 flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-400" />{PHONE_DISPLAY}</a>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Logo />
            <div>
              <div className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">ALDO <span className="text-amber-500">RENT CAR</span></div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">ARC Travel &amp; Tour</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center space-x-8 font-medium text-sm text-slate-600">
            {NAV.map(([h, l]) => <a key={h} href={h} className="hover:text-amber-600 transition-colors">{l}</a>)}
          </nav>
          <a href={genericWa} target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95">
            <MessageCircle className="w-4 h-4 fill-current" />Chat WhatsApp
          </a>
          <button onClick={() => setMenu(!menu)} className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Menu">
            {menu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menu && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            {NAV.map(([h, l]) => <a key={h} href={h} onClick={() => setMenu(false)} className="block py-2 text-slate-700 font-medium hover:text-amber-600">{l}</a>)}
            <a href={genericWa} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3 rounded-xl">
              <MessageCircle className="w-5 h-5 fill-current" />Pesan Sekarang via WA
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <img src={B + 'images/hiace-2.jpg'} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" style={{ objectPosition: '50% 65%' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />Rental Mobil &amp; Tour · Simpang Sirongit
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                Sewa Mobil Aman, Nyaman &amp; Terpercaya Bersama <span className="text-amber-400">Aldo Rent Car</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Solusi transportasi di Simpang Sirongit &amp; sekitarnya. Pilih Lepas Kunci atau dengan Sopir untuk wisata Danau Toba, urusan dinas, hingga acara keluarga.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-sm text-slate-200">
                {['Kondisi Mobil Prima', 'Bisa Lepas Kunci', 'Sopir Hafal Rute', 'Harga Transparan', 'Paket All-In', 'Antar - Jemput Mudah'].map((t) => (
                  <div key={t} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />{t}</div>
                ))}
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a href={waLink('Halo Aldo Rent Car, saya mau tanya stok mobil yang ready.')} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5">
                  <MessageCircle className="w-5 h-5 fill-current" />Booking Cepat via WA
                </a>
                <a href="#armada" className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold px-6 py-4 rounded-xl transition-all">
                  Lihat Pilihan Mobil<ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b pb-3 border-slate-100">
                  <div><h3 className="text-xl font-bold">Pesan Cepat</h3><p className="text-xs text-slate-500">Isi data singkat &amp; langsung ke WhatsApp</p></div>
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center"><Car className="w-5 h-5" /></div>
                </div>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const f = new FormData(e.currentTarget);
                  window.open(waLink(`Halo Aldo Rent Car, nama saya ${f.get('fullname')}.\n\nSaya ingin memesan:\n- Mobil: ${f.get('car_type')}\n- Layanan: ${f.get('rental_type')}\n- Tanggal: ${f.get('start_date') || 'Segera'}\n\nMohon konfirmasi ketersediaan. Terima kasih.`), '_blank');
                }}>
                  <div><label className={labelCls}>Nama Anda</label><input name="fullname" required placeholder="Contoh: Budi Santoso" className={inputCls} /></div>
                  <div><label className={labelCls}>Pilihan Unit Mobil</label>
                    <select name="car_type" className={inputCls}>{FLEET.map((c) => <option key={c.id} value={c.name}>{c.name} ({c.capacity} Seat)</option>)}</select></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelCls}>Layanan</label>
                      <select name="rental_type" className={inputCls}><option>Dengan Sopir</option><option>Lepas Kunci</option><option>Paket All-In</option><option>Paket Tour Wisata</option></select></div>
                    <div><label className={labelCls}>Tgl Gunakan</label><input type="date" name="start_date" className={inputCls} /></div>
                  </div>
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                    Kirim Pesanan via WhatsApp<ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARMADA */}
      <section id="armada" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-amber-600 font-bold text-sm tracking-widest uppercase mb-1">Pilihan Terbaik</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Pilihan Armada Kami</h2>
          <p className="mt-3 text-slate-600">Dari mobil keluarga sampai van rombongan, semua siap menemani perjalanan Anda.</p>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[['all', 'Semua Mobil'], ['family', 'Keluarga / MPV'], ['premium', 'Premium'], ['group', 'Rombongan / HiAce']].map(([id, l]) => (
              <button key={id} onClick={() => setCat(id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${cat === id ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
              <div className="relative h-52 bg-slate-100">
                <CarPhoto car={car} />
                {car.popular && <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-full shadow">Paling Laris</span>}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{car.name}</h3>
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-amber-500" />{car.capacity} Seats</div>
                    <div className="flex items-center gap-1.5"><Settings className="w-4 h-4 text-amber-500" />{car.transmission}</div>
                    <div className="flex items-center gap-1.5"><Fuel className="w-4 h-4 text-amber-500" />{car.fuel}</div>
                  </div>
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                    {car.features.map((f) => <li key={f} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{f}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="bg-slate-50 p-3 rounded-xl mb-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-500 font-medium">{car.allIn ? 'Paket All-In:' : 'Sewa + Sopir:'}</span>
                      <span className="text-lg font-black text-slate-900">{rp(car.priceDriver)}<span className="text-xs font-normal text-slate-500"> /hari</span></span>
                    </div>
                    {car.priceSelfDrive && (
                      <div className="flex justify-between items-baseline mt-1 pt-1 border-t border-slate-200/60">
                        <span className="text-xs text-slate-500 font-medium">Lepas Kunci:</span>
                        <span className="text-sm font-bold text-slate-700">{rp(car.priceSelfDrive)}<span className="text-xs font-normal text-slate-500"> /hari</span></span>
                      </div>
                    )}
                  </div>
                  <a href={waLink(`Halo Aldo Rent Car, saya tertarik menyewa ${car.name}. Boleh minta info ketersediaan?`)} target="_blank" rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow">
                    <MessageCircle className="w-4 h-4 fill-current" />Pesan Unit Ini
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LAYANAN */}
      <section id="layanan" className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-amber-400 font-bold text-sm tracking-widest uppercase mb-1">Layanan Lengkap</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Solusi Perjalanan Tanpa Repot</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ icon: I, t, d, l }) => (
              <div key={t} className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 hover:border-amber-500/50 transition-all">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mb-5"><I className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold mb-2">{t}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{d}</p>
                <ul className="text-xs text-slate-300 space-y-1.5">{l.map((x) => <li key={x}>✓ {x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEUNGGULAN + RUTE */}
      <section id="keunggulan" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="text-amber-600 font-bold text-sm tracking-widest uppercase">Keunggulan Utama</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Mengapa Memilih Aldo Rent Car?</h2>
            <p className="text-slate-600">Kami berkomitmen memberikan layanan sewa kendaraan yang jujur dan mengutamakan kenyamanan pelanggan.</p>
            {[[ShieldCheck, 'Unit Terawat & Bersih', 'Kendaraan dicek dan dibersihkan sebelum diserahkan.'],
              [UserCheck, 'Driver Ramah & Paham Rute', 'Sopir lokal yang hafal jalur Toba, Samosir, hingga Sibolga.'],
              [Sparkles, 'Harga Jelas', 'Tarif disepakati di awal, tanpa biaya yang mengejutkan.']].map(([I, t, d]) => {
              const Icon = I as typeof Car;
              return (
                <div key={t as string} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0"><Icon className="w-5 h-5" /></div>
                  <div><h4 className="font-bold text-slate-900">{t as string}</h4><p className="text-slate-600 text-sm">{d as string}</p></div>
                </div>
              );
            })}
          </div>
          <div className="lg:col-span-7 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-1">Tarif Antar Per Mobil</h3>
            <p className="text-slate-400 text-sm mb-6">Dengan sopir, dari Silangit. Harga per mobil, bukan per orang.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROUTES.map(([r, p]) => (
                <div key={r} className="bg-slate-800/80 border border-slate-700/80 px-4 py-3 rounded-xl flex justify-between items-center text-sm">
                  <span className="text-slate-300">{r}</span><span className="font-bold text-amber-400">{rp(p)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ESTIMASI */}
      <section id="estimasi" className="py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Simulasi Estimasi Biaya Sewa</h2>
            <p className="text-slate-500 text-sm mt-1">Hitung perkiraan biaya sesuai durasi sewa Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div><label className={labelCls}>Pilih Mobil</label>
              <select value={calcCar} onChange={(e) => setCalcCar(e.target.value)} className={inputCls}>{FLEET.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div><label className={labelCls}>Layanan</label>
              <select value={service} onChange={(e) => setCalcService(e.target.value as 'driver' | 'self')} className={inputCls}>
                <option value="driver">{cc.allIn ? 'Paket All-In' : 'Dengan Driver'}</option>
                {cc.priceSelfDrive && <option value="self">Lepas Kunci</option>}
              </select></div>
            <div><label className={labelCls}>Durasi (Hari)</label>
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                <button onClick={() => setDays(Math.max(1, days - 1))} className="px-4 py-3 bg-slate-100 hover:bg-slate-200 font-bold">-</button>
                <input type="number" min={1} value={days} onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))} className="w-full text-center font-bold outline-none" />
                <button onClick={() => setDays(days + 1)} className="px-4 py-3 bg-slate-100 hover:bg-slate-200 font-bold">+</button>
              </div></div>
          </div>
          <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs text-slate-400 block uppercase font-medium">Estimasi Biaya ({days} Hari)</span>
              <span className="text-3xl font-black text-amber-400">{rp(total)}</span>
              <span className="text-xs text-slate-400 block mt-0.5">{cc.allIn ? '*Sudah termasuk BBM dan sopir' : service === 'driver' ? '*Tarif sopir, BBM mengikuti kesepakatan' : '*Lepas kunci, BBM ditanggung penyewa'}</span>
            </div>
            <a href={calcWa} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 font-bold px-6 py-3.5 rounded-xl shadow whitespace-nowrap">
              <MessageCircle className="w-5 h-5 fill-current" />Pesan Hasil Simulasi Ini
            </a>
          </div>
        </div>
      </section>

      {/* LOKASI */}
      <section id="lokasi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-amber-600 font-bold text-sm tracking-widest uppercase mb-1">Lokasi Kami</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Kunjungi Garasi &amp; Kantor Kami</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-between gap-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Informasi Kontak &amp; Alamat</h3>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5" /></div>
                  <div><h4 className="font-bold text-sm">Alamat Garasi / Office</h4><p className="text-slate-600 text-sm">{ADDRESS}</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5" /></div>
                  <div><h4 className="font-bold text-sm">Telepon / WhatsApp</h4>
                    <a href={`tel:+${PHONE_NUMBER}`} className="text-emerald-700 font-bold hover:underline block">{PHONE_DISPLAY}</a></div>
                </div>
              </div>
              <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl shadow">
                <ExternalLink className="w-4 h-4" />Buka Petunjuk Arah Google Maps
              </a>
            </div>
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-md min-h-[380px] bg-slate-100">
              <iframe title="Lokasi Aldo Rent Car" src={MAP_EMBED_URL} className="w-full h-full min-h-[380px] border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">Pertanyaan Sering Diajukan</h2>
          <div className="space-y-4">
            {[['Apa syarat sewa mobil lepas kunci?', 'Hubungi kami via WhatsApp untuk syarat dan proses verifikasi yang berlaku.'],
              ['Apakah harga sewa dengan sopir sudah termasuk BBM?', 'Paket All-In (HiAce dan Fortuner) sudah termasuk mobil, sopir, dan BBM. Untuk mobil lain, BBM mengikuti kesepakatan saat booking.'],
              ['Bisakah dijemput di Bandara Silangit?', 'Bisa. Kabari jadwal penerbangan Anda lewat WhatsApp.']].map(([q, a]) => (
              <div key={q} className="bg-white p-5 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 flex items-center gap-2"><HelpCircle className="w-4 h-4 text-amber-500" />{q}</h4>
                <p className="text-slate-600 text-sm mt-2 pl-6">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3"><Logo size="h-10" /><div className="font-extrabold text-lg text-white">ALDO RENT CAR <span className="text-amber-400">&amp; TOUR</span></div></div>
              <p className="text-sm max-w-sm">Penyedia jasa rental mobil di Simpang Sirongit &amp; sekitarnya.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Navigasi Cepat</h4>
              <ul className="space-y-2 text-sm">{NAV.map(([h, l]) => <li key={h}><a href={h} className="hover:text-amber-400">{l}</a></li>)}</ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Hubungi Kami</h4>
              <p className="text-xs mb-2">{ADDRESS}</p>
              <a href={`tel:+${PHONE_NUMBER}`} className="text-amber-400 font-bold text-sm hover:underline">{PHONE_DISPLAY}</a>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">&copy; {new Date().getFullYear()} Aldo Rent Car (ARC Travel &amp; Tour). All rights reserved.</div>
        </div>
      </footer>

      {/* MOBILE WA BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-50 shadow-2xl flex items-center justify-between gap-3">
        <div><span className="text-[10px] uppercase font-bold text-slate-500 block">Sewa Mobil</span><span className="text-xs font-black text-slate-900">Aldo Rent Car (ARC)</span></div>
        <a href={genericWa} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow">
          <MessageCircle className="w-4 h-4 fill-current" />Chat WA
        </a>
      </div>
    </div>
  );
}
