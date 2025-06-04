require("dotenv").config();
const mongoose = require("mongoose");
const Member = require("./models/Members");

const membersData = [
  {
    id: 0,
    name: "Doç. Dr. Erdem Doğan",
    role: "Yürütücü", 
    image: "public/erdem_dogan.jpg", 
    description: "Erdem Doğan, Kırıkkale Üniversitesi'nde Doçent olarak görev yapmakta ve hali hazırda, “Proaktif Yaklaşım Tabanlı Kavşak Risk Değerlendirme Sisteminin Geliştirilmesi” isimli TUBİTAK projesini yürütmektedir. Doktora derecesini 2014 yılında Kırıkkale Üniversitesi İnşaat Mühendisliği Bölümü’nde Ulaştırma alanında almıştır. Doktora çalışması sırasında, optimize edilmiş bulanık mantık tabanlı bir sinyal kontrol sistemi ve trafik simülasyonu geliştirmiştir.",
  },
  {
    id: 1,
    name: "Prof. Dr. Ali Payıdar Akgüngör",
    role: "Araştırmacı", 
    image: "public/ali_payidar_akgungor.jpg",
    description: "Lisans eğitimini 1989 yılında İstanbul Teknik Üniversitesi, İnşaat Mühendisliği Bölümünde, Yüksek Lisans Eğitimini de 1993 yılında İ.T.Ü. Fen Bilimleri Enstitüsü Ulaştırma Programında birincilikle tamamlamıştır.",
  },
  {
    id: 2,
    name: "Doç. Dr. Ersin Korkmaz",
    role: "Araştırmacı",
    image: "public/ersin_korkmaz.jpg",
    description: "2011 yılında Erciyes Üniversitesi Elektrik-Elektronik Mühendisliği Bölümünden, 2012 yılında ise Erciyes Üniversitesi İnşaat Mühendisliği Bölümünden mezun olmuştur.",
  },
  {
    id: 3,
    name: "Dr. Öğr. Üy. Enes Ayan",
    role: "Araştırmacı",
    image: "public/enes_ayan.jpg",
    description: "2013 yılında Süleyman Demirel Üniversitesi, Mühendislik Fakültesi, Bilgisayar Mühendisliği Bölümünden mezun olmuştur.",
  },
  {
    id: 4,
    name: "Onur Çaydere",
    role: "Bursiyer", 
    image: "public/onur_caydere.jpg",
    description: "2021 yılında Kırıkkale Üniversitesi Mühendislik Fakültesi Bilgisayar Mühendisliği Bölümünden mezun oldu.",
  },
  {
    id: 5,
    name: "Hakan Yıldırım",
    role: "Bursiyer",
    image: "public/hakan_yildirim.jpg",
    description: "2013 yılında Kırıkkale Üniversitesi Mühendislik Fakültesi İnşaat Mühendisliği Bölümü’nden mezun olmuştur.",
  },
  {
    id: 6,
    name: "Rabia Begen",
    role: "Star C Bursiyeri",
    image: "public/rabia_begen.jpg",
    description: "Kırıkkale Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. Mobil uygulama geliştirme ve yapay zeka alanına ilgi duyuyorum.",
  }
];

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(async () => {
    console.log("✅ MongoDB'ye başarıyla bağlandı");
    
    await Member.insertMany(membersData);
    // await Member.deleteMany({});
    console.log("Members başarıyla eklendi!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("❌ MongoDB Bağlantı Hatası:", error);
  });