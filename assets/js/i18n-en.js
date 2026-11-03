/* English for every piece of Thai content (data, page copy, generated labels).
   I18N in data.js covers headings and UI chrome by key; this covers the rest by
   matching the Thai text itself, so content can stay Thai-first in data.js. */
(() => {
  "use strict";

  const TEXT = {
    // ----- Page chrome & hero -----
    "จังหวัดระยอง | เว็บไซต์ทางการ Rayong Province": "Rayong Province | Official Website",
    "ก-": "A-", "ก": "A", "ก+": "A+", "ไทย": "TH",
    "จังหวัดระยอง": "Rayong Province",
    "สำนักงานจังหวัดระยอง": "Rayong Provincial Office",
    "ตราประจำจังหวัดระยอง": "Rayong provincial seal",
    "เปิดเมนู": "Open menu", "ค้นหา": "Search", "เปลี่ยนภาษา": "Change language",
    "ป้ายประชาสัมพันธ์": "Announcement banners", "ภาพก่อนหน้า": "Previous image", "ภาพถัดไป": "Next image",
    "เว็บไซต์ทางการจังหวัดระยอง · Official Website of Rayong Province": "Official Website of Rayong Province",
    "“ผลไม้รสล้ำ อุตสาหกรรมก้าวหน้า น้ำปลารสเด็ด เกาะเสม็ดสวยหรู สุนทรภู่กวีเอก”": "“Delicious fruit, advanced industry, fine fish sauce, beautiful Ko Samet, and Sunthorn Phu the great poet”",
    "คำขวัญประจำจังหวัดระยอง": "Rayong provincial motto",
    "1.08 ล้าน": "1.08 M", "ประชากร": "Population", "9.6 ล้าน/ปี": "9.6 M/yr", "นักท่องเที่ยว": "Visitors",
    "อันดับ 1": "No. 1", "GPP ต่อหัวของประเทศ": "GPP per capita in Thailand", "8 อำเภอ": "8 districts",
    "ครอบคลุมทั้งจังหวัด": "Province-wide coverage", "เลื่อนลงเพื่อสำรวจ": "Scroll to explore",
    "กำลังโหลดแบบจำลองเมือง...": "Loading city model...", "กำลังโหลดแบบจำลองแผนที่...": "Loading map model...",
    "ลากเพื่อหมุน · สกรอลล์เพื่อซูม · คลิกจุดเรืองแสงเพื่อสำรวจ": "Drag to rotate · Scroll to zoom · Click a glowing point to explore",
    "อ่าวไทย": "Gulf of Thailand", "ดูสถานที่ท่องเที่ยวทั้งหมด": "See all attractions",
    "มูลค่ารวมในเขต EEC ระยอง": "Total value in Rayong's EEC zone", "ดูข่าวทั้งหมด": "See all news",
    "สำนักงานจังหวัดระยอง · Rayong Provincial Office": "Rayong Provincial Office",
    "ศาลากลางจังหวัดระยอง ถ.สุขุมวิท ต.เนินพระ อ.เมืองระยอง จ.ระยอง 21150 · โทร 038-694-000": "Rayong Provincial Hall, Sukhumvit Rd, Noen Phra, Mueang Rayong, Rayong 21150 · Tel. 038-694-000",
    "นโยบายเว็บไซต์": "Website policy", "แผนผังเว็บไซต์": "Sitemap",
    "ข้อมูลบางส่วนเป็นข้อมูลตัวอย่างเพื่อการนำเสนอ": "Some data shown is sample data for demonstration",
    "น้องคลื่น · ผู้ช่วยอัจฉริยะระยอง": "Nong Khluen · Rayong Smart Assistant",
    "ออนไลน์ · พร้อมช่วยเหลือ": "Online · Ready to help",
    "ขนาดตัวอักษร": "Font size", "ตัวอักษรขนาดเล็ก": "Small text", "ตัวอักษรขนาดปกติ": "Normal text", "ตัวอักษรขนาดใหญ่": "Large text",
    "ค้นหาข่าว สถานที่ บริการ กิจกรรม...": "Search news, places, services, events...",
    "ปิดหน้าต่างค้นหา": "Close search", "เปิดผู้ช่วย AI": "Open AI assistant",
    "พูดคุยด้วยเสียง (เร็ว ๆ นี้)": "Voice chat (coming soon)", "Voice — เร็ว ๆ นี้": "Voice — coming soon",
    "พิมพ์คำถามของคุณ...": "Type your question...", "ส่งข้อความ": "Send message",
    "ปิดแผงข้อมูล": "Close panel", "ปิดรายละเอียดอำเภอ": "Close district details",
    "โครงการเด่น": "Key projects", "บริการที่เกี่ยวข้อง": "Related services",
    "น. · ระบบปกติ 14/14": " · All systems normal 14/14",
    "ดีมาก": "Very good", "ปกติ": "Normal", "เฝ้าระวัง": "Watch",
    "จ": "Mo", "อ": "Tu", "พ": "We", "พฤ": "Th", "ศ": "Fr", "ส": "Sa", "อา": "Su",
    "ข่าว": "News", "ประกาศ": "Notice", "กิจกรรม": "Event", "สมาร์ทซิตี้": "Smart City",
    "ศูนย์ดำรงธรรมจังหวัดระยอง": "Rayong Damrongdhama Center",
    "สายด่วน 1567 · ร้องเรียน ร้องทุกข์": "Hotline 1567 · Complaints and petitions",
    "ไปเกาะเสม็ดยังไง?": "How do I get to Ko Samet?", "ขอใบอนุญาตธุรกิจ": "Business licence",
    "คุณภาพอากาศวันนี้": "Air quality today", "สิทธิประโยชน์การลงทุน EEC": "EEC investment incentives",
    "ขออภัยครับ ระบบยังไม่มีข้อมูลในเรื่องดังกล่าว\n\nท่านสามารถสอบถามได้ในหัวข้อ: การท่องเที่ยว · บริการภาครัฐ · การลงทุน EEC · คุณภาพอากาศ · การเดินทาง หรือวิสัยทัศน์ 2035\n\nหรือติดต่อสายด่วนจังหวัด โทร 1567 ตลอด 24 ชั่วโมงครับ":
      "Sorry, I don't have information on that yet.\n\nYou can ask about: tourism · government services · EEC investment · air quality · getting around · or Vision 2035.\n\nOr call the provincial hotline 1567, available 24 hours.",
    "สวัสดีครับ ผมคือผู้ช่วยอัจฉริยะประจำจังหวัดระยอง\nยินดีให้บริการข้อมูลด้านบริการภาครัฐ การท่องเที่ยว การลงทุน และข้อมูลเมืองอัจฉริยะ\nกรุณาพิมพ์คำถามที่ต้องการสอบถามได้เลยครับ":
      "Hello, I'm Rayong Province's smart assistant.\nI can help with government services, tourism, investment and smart-city data.\nPlease type your question.",

    // ----- Province identity strip -----
    "ผลไม้รสล้ำ": "Delicious fruit", "อุตสาหกรรมก้าวหน้า": "Advanced industry", "น้ำปลารสเด็ด": "Fine fish sauce",
    "เกาะเสม็ดสวยหรู": "Beautiful Ko Samet", "สุนทรภู่กวีเอก": "Sunthorn Phu, great poet",
    "ทางลัดบริการ": "Quick access", "e-Office จังหวัดระยอง": "Rayong e-Office", "ศูนย์ดำรงธรรม 1567": "Damrongdhama Center 1567",
    "ITA จังหวัดระยอง": "Rayong ITA", "ข้อมูลจังหวัด": "Province data", "จองห้องประชุม": "Book a meeting room",

    // ----- KPIs -----
    "ล้านคน": "million", "เติบโต +2.4% ต่อปี จากการขยายตัวของ EEC": "Growing 2.4% a year with EEC expansion",
    "เศรษฐกิจ (GPP)": "Economy (GPP)", "ล้านล้านบาท": "trillion THB", "GPP ต่อหัวสูงที่สุดในประเทศไทย": "Highest GPP per capita in Thailand",
    "ล้านคน/ปี": "million/yr", "เกาะเสม็ดและชายฝั่งระยองติดอันดับจุดหมายยอดนิยม": "Ko Samet and the Rayong coast rank among top destinations",
    "อุตสาหกรรม": "Industry", "นิคม/เขตประกอบการ": "industrial estates/zones", "ฐานการผลิตปิโตรเคมีและยานยนต์ไฟฟ้าแห่งอนาคต": "Hub for petrochemicals and future EV manufacturing",
    "การศึกษา": "Education", "สถานศึกษา": "schools", "โรงเรียนอัจฉริยะและศูนย์พัฒนาทักษะดิจิทัล 86 แห่ง": "86 smart schools and digital skills centres",
    "พลังงานสะอาด": "Clean energy", "% ของการผลิต": "% of generation", "เป้าหมาย 60% ภายในปี 2035 ด้วยโซลาร์และไฮโดรเจน": "Target of 60% by 2035 from solar and hydrogen",
    "นวัตกรรม": "Innovation", "สตาร์ทอัพ": "startups", "ศูนย์นวัตกรรม EECi วังจันทร์วัลเลย์เป็นแกนกลาง": "Anchored by the EECi Wangchan Valley innovation hub",
    "บริการอัจฉริยะ": "Smart services", "บริการดิจิทัล": "Digital services", "บริการภาครัฐออนไลน์ครอบคลุม 96% ของงานบริการ": "Online government services cover 96% of all services",
    "38 นิคม/เขตประกอบการ": "38 industrial estates/zones", "412 สถานศึกษา": "412 schools", "156 สตาร์ทอัพ": "156 startups", "248 บริการดิจิทัล": "248 digital services",

    // ----- Governor & activities -----
    "นายไตรภพ วงศ์ไตรรัตน์": "Mr. Traiphop Wongtrairat",
    "ผู้ว่าราชการจังหวัดระยอง": "Governor of Rayong",
    "ผู้ว่าราชการจังหวัดระยอง นายไตรภพ วงศ์ไตรรัตน์": "Governor of Rayong, Mr. Traiphop Wongtrairat",
    "พ.ศ. 2566": "2023", "ดำรงตำแหน่งตั้งแต่ พ.ศ. 2566": "In office since 2023",
    "จังหวัดระยองกำลังก้าวเข้าสู่บทใหม่ของการพัฒนา — จากเมืองอุตสาหกรรมชายฝั่งทะเลตะวันออก สู่จังหวัดอัจฉริยะที่เศรษฐกิจ สิ่งแวดล้อม และคุณภาพชีวิตของประชาชนเติบโตไปด้วยกันอย่างสมดุล":
      "Rayong is entering a new chapter of development — from an industrial city on the Eastern Seaboard to a smart province where the economy, the environment and people's quality of life grow together in balance.",
    "ภายใต้แผนพัฒนาจังหวัดระยอง พ.ศ. 2568–2578 เรามุ่งใช้เทคโนโลยีดิจิทัล ข้อมูลเปิด และการมีส่วนร่วมของประชาชนทุกภาคส่วน เป็นกลไกขับเคลื่อนเมือง เพื่อให้ระยองเป็นบ้านที่น่าอยู่ น่าลงทุน และน่ามาเยือนของทุกคน":
      "Under the Rayong Provincial Development Plan 2025–2035, we use digital technology, open data and participation from every sector to drive the city, so that Rayong is a great place for everyone to live, invest and visit.",
    "“ระยองเมืองน่าอยู่ เศรษฐกิจมูลค่าสูง สังคมมีสุข สิ่งแวดล้อมยั่งยืน”": "“A liveable Rayong: a high-value economy, a happy society and a sustainable environment”",
    "นายไตรภพ วงศ์ไตรรัตน์ ผู้ว่าราชการจังหวัดระยอง": "Mr. Traiphop Wongtrairat, Governor of Rayong",
    "เป็นประธานโครงการ “แสงนำใจไทยทั้งชาติ เดิน วิ่ง ปั่น ป้องกันอัมพาต ครั้งที่ 12 เฉลิมพระเกียรติ”": "Presided over the 12th royal-tribute “Light of Thai Hearts” walk, run and ride for stroke prevention",
    "สนามกีฬากลางจังหวัดระยอง": "Rayong Provincial Stadium",
    "นายกำธร เวหน รองผู้ว่าราชการจังหวัดระยอง": "Mr. Kamthon Wehon, Deputy Governor of Rayong",
    "เป็นประธานงานปริวาสกรรม ประจำปี 2569 ร่วมทำบุญตักบาตรและถวายน้ำปานะพระภิกษุสงฆ์": "Presided over the 2026 Parivasa retreat, offering alms and drinks to the monks",
    "วัดช้างชนศิริราษฎร์บำรุง ต.ตะพง": "Wat Chang Chon Siri Rat Bamrung, Taphong",
    "นางสาวสลารีวรรณ ทัพทวี รองผู้ว่าราชการจังหวัดระยอง": "Ms. Salareewan Thapthawi, Deputy Governor of Rayong",
    "เป็นประธานเปิดนิทรรศการให้ความรู้โรคหลอดเลือดสมอง โครงการแสงนำใจไทยทั้งชาติ ครั้งที่ 12": "Opened a stroke-awareness exhibition for the 12th “Light of Thai Hearts” project",
    "ศูนย์การค้าแพชชั่น ช้อปปิ้งเดสติเนชั่น": "Passione Shopping Destination",
    "ให้การต้อนรับ พลอากาศเอก สมคิด สุขบาง ในกิจกรรมศึกษาดูงานเพื่อสร้างแรงบันดาลใจให้กับเยาวชน": "Welcomed Air Chief Marshal Somkid Sukbang on a study visit to inspire young people",
    "โรงแยกก๊าซธรรมชาติ จ.ระยอง": "Natural gas separation plant, Rayong",
    "รองผู้ว่าราชการจังหวัดระยอง": "Deputy Governor of Rayong", "ปลัดจังหวัดระยอง": "Rayong Deputy Provincial Governor (Palad)",

    // ----- Digital-twin zones -----
    "ศูนย์ราชการดิจิทัลไร้กระดาษ": "A paperless digital government centre",
    "บริการออนไลน์": "Online services", "248 บริการ": "248 services", "เวลาดำเนินการเฉลี่ย": "Average processing time",
    "ลดลง 78%": "Down 78%", "ความพึงพอใจ": "Satisfaction",
    "ศาลากลางดิจิทัล One Province One ID": "Digital provincial hall: One Province One ID",
    "ระบบอนุมัติ-อนุญาตอัจฉริยะ e-Permit": "e-Permit smart approvals and licensing",
    "แพลตฟอร์มรับฟังเสียงประชาชน Rayong Voice": "Rayong Voice citizen feedback platform",
    "ยื่นคำร้องออนไลน์": "Submit requests online", "ติดตามสถานะเรื่อง": "Track request status", "นัดหมายราชการ": "Book a government appointment",
    "ท่องเที่ยวอัจฉริยะชายฝั่งตะวันออก": "Smart tourism on the Eastern coast",
    "นักท่องเที่ยว/ปี": "Visitors/year", "9.6 ล้านคน": "9.6 million", "รายได้ท่องเที่ยว": "Tourism revenue",
    "4.2 หมื่นล้านบาท": "42 billion THB", "1,250 จุด": "1,250 spots",
    "Digital Tourist Pass เที่ยวทั่วระยองด้วย QR เดียว": "Digital Tourist Pass: all of Rayong with one QR code",
    "AR Heritage Walk ย่านเมืองเก่ายมจินดา": "AR Heritage Walk in the Yomjinda old town",
    "ระบบจัดการความหนาแน่นชายหาดเรียลไทม์": "Real-time beach crowd management",
    "วางแผนทริปด้วย AI": "Plan trips with AI", "จองเรือไปเกาะเสม็ด": "Book a boat to Ko Samet", "แจ้งเตือนน้ำทะเล-สภาพอากาศ": "Sea and weather alerts",
    "โครงข่ายเดินทางไร้รอยต่อ": "A seamless transport network",
    "สถานีชาร์จ EV": "EV charging stations", "320 สถานี": "320 stations", "รถ EV Shuttle": "EV shuttles", "85 คัน": "85 vehicles",
    "ลดเวลาเดินทาง": "Travel time saved",
    "รถไฟความเร็วสูงเชื่อม 3 สนามบิน (สถานีระยอง)": "High-speed rail linking 3 airports (Rayong station)",
    "EV Smart Shuttle เชื่อมนิคม-เมือง-ชายหาด": "EV Smart Shuttle linking estates, town and beaches",
    "ระบบไฟจราจร AI ปรับตามสภาพจริง": "AI traffic lights that adapt to real conditions",
    "แอปเดินทาง Rayong Transit": "Rayong Transit app", "จองที่จอดรถล่วงหน้า": "Book parking in advance", "แผนที่สถานีชาร์จ": "Charging station map",
    "ฐานอุตสาหกรรม 4.0 ของ EEC": "The EEC's Industry 4.0 base",
    "มูลค่าลงทุน EEC": "EEC investment", "6.8 แสนล้านบาท": "680 billion THB", "โรงงานอัจฉริยะ": "Smart factories", "142 แห่ง": "142 sites",
    "แรงงานทักษะสูง": "High-skill workers", "58,000 คน": "58,000 people",
    "เขตนวัตกรรม EECi วังจันทร์วัลเลย์": "EECi Wangchan Valley innovation zone",
    "ท่าเรือมาบตาพุดเฟส 3 อัจฉริยะ": "Smart Map Ta Phut Port Phase 3",
    "ศูนย์ผลิตยานยนต์ไฟฟ้าและแบตเตอรี่": "EV and battery manufacturing centre",
    "ขอใบอนุญาตประกอบการ": "Apply for an operating licence", "จับคู่ธุรกิจ-ซัพพลายเออร์": "Business–supplier matching", "ข้อมูลสิทธิประโยชน์ BOI": "BOI incentive information",
    "เมืองคาร์บอนต่ำ อากาศสะอาด": "A low-carbon city with clean air",
    "เซนเซอร์คุณภาพอากาศ": "Air quality sensors", "480 จุด": "480 points", "ลดคาร์บอน": "Carbon reduction",
    "-28% จากปี 2020": "-28% since 2020", "พื้นที่สีเขียว": "Green space", "+1,200 ไร่": "+192 ha",
    "โซลาร์ฟาร์มลอยน้ำอ่างเก็บน้ำดอกกราย": "Floating solar farm at Dok Krai Reservoir",
    "ระบบเฝ้าระวัง PM2.5 แจ้งเตือนล่วงหน้า": "PM2.5 monitoring with early warnings",
    "ธนาคารขยะรีไซเคิลอัจฉริยะ 68 ชุมชน": "Smart recycling banks in 68 communities",
    "เช็คคุณภาพอากาศรายชั่วโมง": "Hourly air quality", "แจ้งปัญหาสิ่งแวดล้อม": "Report environmental issues", "คำนวณคาร์บอนฟุตพรินต์": "Carbon footprint calculator",
    "ชุมชนเชื่อมโยง ปลอดภัย น่าอยู่": "Connected, safe and liveable communities",
    "กล้อง AI ปลอดภัย": "AI safety cameras", "2,400 ตัว": "2,400 cameras", "ชุมชนดิจิทัล": "Digital communities", "186 ชุมชน": "186 communities",
    "ลดอาชญากรรม": "Crime reduction",
    "ศูนย์สุขภาพชุมชน Telemedicine ทุกตำบล": "Telemedicine health centres in every sub-district",
    "เสาไฟอัจฉริยะ Smart Pole 1,800 ต้น": "1,800 Smart Poles",
    "แพลตฟอร์มผู้สูงอายุ Rayong Care": "Rayong Care platform for older people",
    "แจ้งเหตุฉุกเฉิน SOS": "SOS emergency alert", "ปรึกษาแพทย์ทางไกล": "Remote doctor consultation", "กิจกรรมชุมชน": "Community activities",

    // ----- Live data -----
    "อุณหภูมิ": "Temperature", "ดัชนีคุณภาพอากาศ (AQI)": "Air Quality Index (AQI)", "ความคล่องตัวจราจร": "Traffic flow",
    "นักท่องเที่ยววันนี้": "Visitors today", "คน": "people", "คำขอบริการรัฐวันนี้": "Service requests today", "เรื่อง": "requests",
    "ปริมาณน้ำอ่างเก็บน้ำ": "Reservoir level", "การใช้พลังงาน": "Energy use", "คาร์บอนลดสะสมปีนี้": "Carbon saved this year", "ตัน": "tonnes",
    "ประชากรในเขตเมือง": "Urban population", "พันคน": "thousand people", "นักท่องเที่ยวรายเดือน": "Monthly visitors",
    "ปริมาณจราจรเฉลี่ย": "Average traffic", "พันคัน/วัน": "thousand vehicles/day", "การชาร์จ EV รายเดือน": "Monthly EV charging",
    "พันครั้ง": "thousand sessions", "PM2.5 เฉลี่ย": "Average PM2.5", "ปริมาณฝนสะสม": "Cumulative rainfall", "มม.": "mm",
    "มูลค่าการลงทุนใหม่": "New investment", "พันล้านบาท": "billion THB", "ธุรกรรมบริการรัฐดิจิทัล": "Digital government transactions", "พันรายการ": "thousand transactions",

    // ----- Calendar events -----
    "เทศกาลผลไม้และของดีจังหวัดระยอง ประจำปี 2569": "Rayong Fruit and Local Products Festival 2026",
    "ตลาดกลางผลไม้ตะพง อ.เมืองระยอง": "Taphong Central Fruit Market, Mueang Rayong", "เทศกาล": "Festival",
    "เปิดบูธสินค้า OTOP ระยอง พรีเมียม": "Rayong Premium OTOP booth opening",
    "ลานกิจกรรม Passione Shopping Destination": "Event plaza, Passione Shopping Destination",
    "ประชุมรับฟังความคิดเห็นแผนพัฒนาเมืองอัจฉริยะ ครั้งที่ 3": "3rd public hearing on the smart city development plan",
    "ศาลากลางจังหวัดระยอง ห้องภักดีศรีสงคราม": "Phakdi Si Songkhram Room, Rayong Provincial Hall", "ประชุม": "Meeting",
    "อบรมเกษตรกรดิจิทัล: ใช้ข้อมูลดาวเทียมวางแผนสวนผลไม้": "Digital farmer training: planning orchards with satellite data",
    "สำนักงานเกษตรจังหวัดระยอง": "Rayong Provincial Agriculture Office", "อบรม": "Training",
    "วิ่งมินิมาราธอน Rayong Smart Run 2026": "Rayong Smart Run 2026 mini-marathon",
    "หาดแหลมเจริญ อ.เมืองระยอง": "Laem Charoen Beach, Mueang Rayong",
    "ประชุมคณะกรรมการร่วมภาครัฐ-เอกชน (กรอ.) จังหวัดระยอง": "Rayong Joint Public–Private Committee meeting",
    "ศูนย์ราชการจังหวัดระยอง": "Rayong Government Centre",
    "เทศกาลดนตรีริมทะเล Rayong Beach Fest": "Rayong Beach Fest seaside music festival", "หาดแม่รำพึง": "Mae Ramphueng Beach",
    "อบรมผู้ประกอบการ: ยกระดับร้านค้าสู่ e-Commerce": "Entrepreneur training: taking shops to e-commerce",
    "หอการค้าจังหวัดระยอง": "Rayong Chamber of Commerce",
    "กิจกรรมปลูกป่าชายเลนเฉลิมพระเกียรติ ปากน้ำประแส": "Royal-tribute mangrove planting, Pak Nam Prasae",
    "ทุ่งโปรงทอง อ.แกลง": "Thung Prong Thong, Klaeng",

    // ----- PR news -----
    "จังหวัดระยองเปิดรับสมัครอาสาสมัครดิจิทัลชุมชน รุ่นที่ 5 จำนวน 300 อัตรา": "Rayong opens applications for 300 community digital volunteers (cohort 5)",
    "ร่วมเป็นตัวแทนชุมชนช่วยเหลือประชาชนใช้งานบริการรัฐดิจิทัล รับสมัครถึง 30 มิ.ย. 2569 ผ่านแอป Rayong Connect": "Help your community use digital government services. Apply by 30 Jun 2026 in the Rayong Connect app.",
    "ขอเชิญประชาชนร่วมประชาพิจารณ์ผังเมืองรวมจังหวัดระยอง ฉบับปรับปรุงครั้งที่ 4": "Public hearing on the 4th revision of the Rayong comprehensive city plan",
    "เวทีรับฟังความคิดเห็น 4 อำเภอ ระหว่าง 15–26 มิ.ย. 2569 พร้อมช่องทางออนไลน์ผ่านแพลตฟอร์ม Rayong Voice": "Hearings in 4 districts, 15–26 Jun 2026, plus online input on the Rayong Voice platform.",
    "สำนักงานโยธาธิการและผังเมืองจังหวัด": "Provincial Public Works and Town Planning Office",
    "ประกาศเขตพื้นที่เฝ้าระวังคุณภาพอากาศ พร้อมมาตรการช่วยเหลือเกษตรกรงดเผา": "Air-quality watch zones announced, with support for farmers who stop burning",
    "สนับสนุนเครื่องจักรไถกลบฟรีและรับซื้อเศษวัสดุเกษตร 68 ชุมชน ลงทะเบียนรับสิทธิ์ได้ที่เกษตรอำเภอทุกแห่ง": "Free ploughing machinery and purchase of crop residue in 68 communities. Register at any district agriculture office.",
    "สำนักงานทรัพยากรธรรมชาติและสิ่งแวดล้อมจังหวัด": "Provincial Natural Resources and Environment Office",
    "กำหนดการจ่ายเบี้ยยังชีพผู้สูงอายุและเบี้ยความพิการ ประจำเดือนมิถุนายน 2569": "June 2026 payment schedule for elderly and disability allowances",
    "โอนเข้าบัญชีวันที่ 10 มิ.ย. 2569 ตรวจสอบสิทธิ์และสถานะการโอนได้ทางแอป Rayong Care หรือสายด่วน 1567": "Paid into accounts on 10 Jun 2026. Check eligibility and status in the Rayong Care app or call 1567.",
    "สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์จังหวัด": "Provincial Social Development and Human Security Office",
    "เปิดให้บริการหน่วยทะเบียนเคลื่อนที่ (Mobile One ID) ประจำเดือนมิถุนายน": "Mobile registration unit (Mobile One ID) schedule for June",
    "ทำบัตรประชาชน เปลี่ยนชื่อ-สกุล และลงทะเบียน One Province One ID ถึงหมู่บ้าน ตรวจสอบตารางจุดบริการ 32 จุด": "ID cards, name changes and One Province One ID registration in your village. See the schedule for 32 service points.",
    "ที่ทำการปกครองจังหวัดระยอง": "Rayong Provincial Administration Office",
    "ผลการประกวดนวัตกรรมเยาวชนสมาร์ทซิตี้ Rayong Youth Innovation 2026": "Results of the Rayong Youth Innovation 2026 smart city contest",
    "ทีม 'น้ำใสระยอง' จากโรงเรียนระยองวิทยาคมคว้ารางวัลชนะเลิศด้วยระบบเซนเซอร์ตรวจคุณภาพน้ำคลองต้นทุนต่ำ": "Team 'Clear Water Rayong' from Rayong Witthayakhom School won first prize with a low-cost canal water-quality sensor.",
    "สำนักงานศึกษาธิการจังหวัด": "Provincial Education Office", "ประชาสัมพันธ์": "Public relations",

    // ----- Procurement -----
    "ประกาศจัดซื้อจัดจ้าง": "Procurement notice", "ร่าง TOR": "Draft TOR", "ประกาศผู้ชนะ": "Award notice", "ราคากลาง": "Reference price",
    "ประกวดราคาจ้างก่อสร้างศูนย์บริการประชาชนแบบเบ็ดเสร็จ (One Stop Service) อำเภอแกลง ด้วยวิธีประกวดราคาอิเล็กทรอนิกส์ (e-bidding)": "Construction of a One Stop Service centre in Klaeng District by electronic bidding (e-bidding)",
    "ร่างขอบเขตของงาน (TOR) โครงการติดตั้งเสาไฟอัจฉริยะ Smart Pole ระยะที่ 3 จำนวน 600 ต้น พร้อมระบบบริหารจัดการส่วนกลาง": "Draft terms of reference: Smart Pole Phase 3, 600 poles with a central management system",
    "ประกาศผู้ชนะการเสนอราคา จ้างเหมาบำรุงรักษาระบบเซนเซอร์ตรวจวัดคุณภาพอากาศ 480 จุด ประจำปีงบประมาณ 2569": "Award: maintenance of 480 air-quality sensors, fiscal year 2026",
    "เปิดเผยราคากลาง โครงการจัดซื้อรถโดยสารไฟฟ้า (EV Shuttle) ขนาด 20 ที่นั่ง จำนวน 12 คัน พร้อมสถานีอัดประจุ": "Reference price: 12 twenty-seat EV shuttles with charging stations",
    "ประกวดราคาซื้อครุภัณฑ์คอมพิวเตอร์พร้อมระบบห้องเรียนอัจฉริยะ สำหรับโรงเรียนในสังกัด 24 แห่ง ด้วยวิธี e-bidding": "Purchase of computers and smart-classroom systems for 24 schools by e-bidding",
    "ประกาศผู้ชนะการเสนอราคา จ้างก่อสร้างทางจักรยานเลียบชายฝั่งหาดแม่รำพึง ระยะทาง 6.8 กม. โดยวิธีคัดเลือก": "Award: 6.8 km coastal cycle path at Mae Ramphueng Beach, by selection",
    "วงเงินงบประมาณ": "Budget", "เอกสาร": "Documents",

    // ----- Datasets & media -----
    "แผนพัฒนาจังหวัดระยอง พ.ศ. 2568–2578 (ฉบับเต็ม)": "Rayong Provincial Development Plan 2025–2035 (full)",
    "สถิติประชากรและทะเบียนราษฎร รายอำเภอ ปี 2568": "Population and civil registration statistics by district, 2025",
    "ชุดข้อมูลคุณภาพอากาศรายชั่วโมง (PM2.5) ย้อนหลัง 3 ปี": "Hourly air quality (PM2.5), last 3 years",
    "ชั้นข้อมูลแผนที่เขตผังเมืองรวมจังหวัดระยอง": "Map layers of Rayong comprehensive plan zones",
    "รายงานภาวะเศรษฐกิจการคลังจังหวัด รายไตรมาส": "Quarterly provincial fiscal and economic report",
    "วีดิทัศน์แนะนำวิสัยทัศน์ Rayong SMART PROVINCE": "Video: the Rayong SMART PROVINCE vision",
    "อินโฟกราฟิก: 10 ตัวชี้วัดเมืองอัจฉริยะระยอง ปี 2569": "Infographic: 10 Rayong smart city indicators, 2026",
    "สารคดีสั้น: วิถีประมงพื้นบ้านปากน้ำประแสกับเทคโนโลยีใหม่": "Short documentary: Pak Nam Prasae's traditional fishing meets new technology",
    "อัลบั้มภาพ: เทศกาลผลไม้และของดีเมืองระยอง 2569": "Photo album: Rayong Fruit and Local Products Festival 2026",

    // ----- Districts & map -----
    "อ.เมืองระยอง": "Mueang Rayong", "อ.บ้านฉาง": "Ban Chang", "อ.นิคมพัฒนา": "Nikhom Phatthana", "อ.บ้านค่าย": "Ban Khai",
    "อ.ปลวกแดง": "Pluak Daeng", "อ.วังจันทร์": "Wang Chan", "อ.เขาชะเมา": "Khao Chamao", "อ.แกลง": "Klaeng",
    "ศูนย์กลางราชการ เศรษฐกิจ และการท่องเที่ยวชายฝั่ง": "Centre of government, business and coastal tourism",
    "ที่ตั้งศูนย์ราชการจังหวัด ย่านเมืองเก่ายมจินดา และชายหาดท่องเที่ยวสำคัญ พร้อมท่าเรือสู่เกาะเสม็ด": "Home to the provincial government centre, the Yomjinda old town and major beaches, plus the pier for Ko Samet.",
    "เกาะเสม็ด": "Ko Samet", "ถนนยมจินดา": "Yomjinda Road", "เจดีย์กลางน้ำ": "Phra Chedi Klang Nam",
    "~2.6 แสนคน": "~260,000", "ตำบล": "Sub-districts", "15 ตำบล": "15", "3 ตำบล": "3", "4 ตำบล": "4", "7 ตำบล": "7", "6 ตำบล": "6",
    "ประตูสู่ EEC — สนามบินอู่ตะเภาและเมืองการบิน": "Gateway to the EEC — U-Tapao Airport and the Aerotropolis",
    "ที่ตั้งสนามบินนานาชาติอู่ตะเภาและเขตเมืองการบินภาคตะวันออก จุดยุทธศาสตร์การลงทุนของ EEC": "Home to U-Tapao International Airport and the Eastern Aerotropolis, a strategic EEC investment area.",
    "สนามบินอู่ตะเภา": "U-Tapao Airport", "หาดพยูน": "Phayun Beach", "หาดน้ำริน": "Nam Rin Beach", "~1.0 แสนคน": "~100,000",
    "ฐานอุตสาหกรรมและเกษตรกรรมก้าวหน้า": "Advanced industry and agriculture",
    "พื้นที่นิคมอุตสาหกรรมสำคัญควบคู่แหล่งเกษตร สับปะรดและมันสำปะหลังคุณภาพของจังหวัด": "Major industrial estates alongside farmland producing the province's quality pineapple and cassava.",
    "นิคมอุตสาหกรรม": "Industrial estates", "สับปะรดระยอง": "Rayong pineapple", "เกษตรแปลงใหญ่": "Large-scale farming", "~5.4 หมื่นคน": "~54,000",
    "เมืองประวัติศาสตร์และสวนผลไม้": "History and orchards",
    "แหล่งประวัติศาสตร์สมเด็จพระเจ้าตากสิน วัดละหารไร่ (หลวงปู่ทิม) และสวนผลไม้นานาชนิด": "Historic sites of King Taksin, Wat Lahan Rai (Luang Pu Thim) and many kinds of orchards.",
    "วัดละหารไร่": "Wat Lahan Rai", "ค่ายตากสิน": "King Taksin's camp", "สวนผลไม้": "Orchards", "~7.5 หมื่นคน": "~75,000",
    "ฐานการผลิตอุตสาหกรรมยานยนต์แห่งอนาคต": "Manufacturing base for the future auto industry",
    "ที่ตั้งนิคมอุตสาหกรรมขนาดใหญ่และอ่างเก็บน้ำดอกกราย แหล่งน้ำต้นทุนสำคัญของ EEC": "Large industrial estates and Dok Krai Reservoir, a key water source for the EEC.",
    "อ่างเก็บน้ำดอกกราย": "Dok Krai Reservoir", "ยานยนต์ EV": "EV manufacturing", "~9.0 หมื่นคน": "~90,000",
    "วังจันทร์วัลเลย์ — เมืองนวัตกรรม EECi": "Wangchan Valley — the EECi innovation city",
    "ที่ตั้งเขตนวัตกรรมระเบียงเศรษฐกิจพิเศษภาคตะวันออก (EECi) ควบคู่สวนทุเรียนและผลไม้เมืองร้อน": "Home to the Eastern Economic Corridor of Innovation (EECi), alongside durian and tropical fruit orchards.",
    "วังจันทร์วัลเลย์": "Wangchan Valley", "ทุเรียนระยอง": "Rayong durian", "~3.0 หมื่นคน": "~30,000",
    "ผืนป่าตะวันออกและน้ำตกธรรมชาติ": "Eastern forests and waterfalls",
    "ที่ตั้งอุทยานแห่งชาติเขาชะเมา–เขาวง ผืนป่าต้นน้ำและแหล่งท่องเที่ยวเชิงนิเวศของจังหวัด": "Home to Khao Chamao–Khao Wong National Park, the province's watershed forest and ecotourism area.",
    "น้ำตกเขาชะเมา": "Khao Chamao Waterfall", "อุทยานแห่งชาติ": "National park", "ท่องเที่ยวเชิงนิเวศ": "Ecotourism", "~2.4 หมื่นคน": "~24,000",
    "เมืองสุนทรภู่ ทะเลประแส และสวนผลไม้": "Sunthorn Phu's hometown, the Prasae coast and orchards",
    "บ้านเกิดสุนทรภู่ แหล่งท่องเที่ยวปากน้ำประแส ทุ่งโปรงทอง และสวนผลไม้ใหญ่ที่สุดของจังหวัด": "Birthplace of Sunthorn Phu, with Pak Nam Prasae, Thung Prong Thong and the province's largest orchards.",
    "ทุ่งโปรงทอง": "Thung Prong Thong", "อนุสาวรีย์สุนทรภู่": "Sunthorn Phu Monument", "ปากน้ำประแส": "Pak Nam Prasae",
    "ผลไม้ตามฤดู": "Seasonal fruit", "~1.3 แสนคน": "~130,000",
    "สวนพฤกษศาสตร์ระยอง": "Rayong Botanical Garden", "ถนนยมจินดา ย่านเมืองเก่า": "Yomjinda Road old town", "วัดป่าประดู่": "Wat Pa Pradu",
    "อนุสรณ์เรือรบหลวงประแส ปากน้ำประแส": "HTMS Prasae Memorial, Pak Nam Prasae",

    // ----- Stay / eat / OTOP / culture / goods -----
    "เดอะ เบย์วิว รีสอร์ต เกาะเสม็ด": "The Bayview Resort Ko Samet", "รีสอร์ตริมทะเล": "Seaside resort",
    "แม่รำพึง บีชฟร้อนท์ โฮเทล": "Mae Ramphueng Beachfront Hotel", "โรงแรมริมหาด": "Beachfront hotel",
    "บ้านสวนผลไม้ โฮมสเตย์": "Ban Suan Phonlamai Homestay", "โฮมสเตย์เชิงเกษตร": "Farm homestay", "ตะพง อ.เมืองระยอง": "Taphong, Mueang Rayong",
    "ประแสริเวอร์ บูทีค": "Prasae River Boutique", "บูทีคโฮเทลริมน้ำ": "Riverside boutique hotel", "ปากน้ำประแส อ.แกลง": "Pak Nam Prasae, Klaeng",
    "ครัวชายทะเลแกลง": "Klaeng Seaside Kitchen", "ซีฟู้ดพื้นถิ่น": "Local seafood",
    "กั้งกระดานนึ่งมะนาว · หมึกไข่ต้มน้ำปลา": "Steamed slipper lobster with lime · Squid with roe in fish sauce",
    "ก๋วยเตี๋ยวเรือยมจินดา": "Yomjinda Boat Noodles", "อาหารท้องถิ่นย่านเมืองเก่า": "Old-town local food", "ถนนยมจินดา อ.เมืองระยอง": "Yomjinda Road, Mueang Rayong",
    "ก๋วยเตี๋ยวต้มยำปูใบ้ สูตร 60 ปี": "Tom yum crab noodles, a 60-year-old recipe",
    "บ้านปลากะพง บ้านเพ": "Ban Pla Kaphong, Ban Phe", "ซีฟู้ด & วิวทะเล": "Seafood & sea view", "บ้านเพ อ.เมืองระยอง": "Ban Phe, Mueang Rayong",
    "ปลากะพงทอดน้ำปลา · แกงส้มปลากะพงยอดมะพร้าว": "Fried sea bass with fish sauce · Sour curry with sea bass and coconut shoots",
    "สวนอาหารผลไม้ตะพง": "Taphong Fruit Garden Restaurant", "อาหารไทย & บุฟเฟ่ต์ผลไม้": "Thai food & fruit buffet",
    "ข้าวเหนียวทุเรียนหมอนทอง · ส้มตำผลไม้รวม": "Monthong durian sticky rice · Mixed fruit som tam",
    "ทุเรียนทอดกรอบหมอนทอง": "Crispy Monthong durian chips", "วิสาหกิจชุมชนตะพง": "Taphong Community Enterprise", "อาหารแปรรูป": "Processed food",
    "น้ำปลาแท้ตราประแส": "Prasae pure fish sauce", "กลุ่มแม่บ้านปากน้ำประแส": "Pak Nam Prasae Housewives Group", "เครื่องปรุง": "Condiments",
    "ผ้าทอมือลายเกาะเสม็ด": "Ko Samet hand-woven cloth", "กลุ่มทอผ้าบ้านค่าย": "Ban Khai Weaving Group", "หัตถกรรม": "Handicrafts",
    "สับปะรดทองระยองอบแห้ง": "Dried Rayong golden pineapple", "วิสาหกิจชุมชนนิคมพัฒนา": "Nikhom Phatthana Community Enterprise",
    "งานบุญกลางบ้านและเครื่องบูชาพระเจดีย์กลางน้ำ": "Bun Klang Ban and the Phra Chedi Klang Nam offering", "ประเพณี": "Tradition",
    "พฤศจิกายน–ธันวาคม": "November–December",
    "ประเพณีเก่าแก่คู่เมืองระยอง ห่มผ้าองค์พระเจดีย์กลางน้ำ พร้อมขบวนเรือประดับไฟกลางแม่น้ำระยอง": "A long-held Rayong tradition: wrapping the Chedi Klang Nam in cloth, with an illuminated boat parade on the Rayong River.",
    "เทศกาลเที่ยวทะเลหาดบ้านเพ–เกาะเสม็ด": "Ban Phe–Ko Samet Sea Festival", "พฤษภาคม": "May",
    "งานประจำปีเปิดฤดูท่องเที่ยวทะเลระยอง ขบวนแห่ทางน้ำ การแข่งขันกีฬาชายหาด และตลาดอาหารทะเล": "The yearly opening of Rayong's beach season, with a water parade, beach sports and a seafood market.",
    "ดนตรีพื้นบ้าน \"เพลงบอก\" และหนังใหญ่วัดบ้านดอน": "\"Phleng Bok\" folk songs and the Wat Ban Don grand shadow play", "วัฒนธรรม": "Culture", "ตลอดปี": "All year",
    "มรดกการแสดงพื้นถิ่นภาคตะวันออก สืบทอดผ่านชุมชนและโรงเรียนกว่า 100 ปี ชมการแสดงได้ที่วัดบ้านดอน": "Eastern performing heritage passed down through communities and schools for over 100 years. See it at Wat Ban Don.",
    "ทุเรียนหมอนทองระยอง": "Rayong Monthong durian", "ผลไม้ GI": "GI fruit",
    "ราชาผลไม้จากสวนตะพง เนื้อหนานุ่ม หวานมัน ขึ้นทะเบียนสิ่งบ่งชี้ทางภูมิศาสตร์": "The king of fruits from Taphong orchards: thick, soft, rich and sweet, with Geographical Indication status.",
    "มังคุดคัดพิเศษเขาชะเมา": "Khao Chamao select mangosteen", "ผลไม้": "Fruit",
    "ราชินีผลไม้จากเชิงเขาชะเมา เปลือกบาง เนื้อขาวฉ่ำ รสหวานอมเปรี้ยวกำลังดี": "The queen of fruits from the foothills of Khao Chamao: thin skin, juicy white flesh, perfectly sweet and tart.",
    "กะปิระยองแท้": "Genuine Rayong shrimp paste", "ของฝาก": "Souvenir",
    "กะปิเคยแท้จากทะเลบ้านเพ หมักตามภูมิปัญญาดั้งเดิม หอมเข้มข้นเป็นเอกลักษณ์": "Pure krill paste from Ban Phe, fermented the traditional way for a rich, distinctive aroma.",
    "สละสุมาลี": "Sumali salak",
    "สละพันธุ์ดีรสหวานหอม ปลูกมากที่ อ.แกลง ของฝากยอดนิยมประจำจังหวัด": "A sweet, fragrant salak grown mainly in Klaeng and a favourite provincial souvenir.",

    // ----- Services & economy -----
    "บริการประชาชน": "Citizen services", "งานทะเบียน เอกสารราชการ และสิทธิประโยชน์ ครบจบในแอปเดียว": "Registration, official documents and benefits, all in one app",
    "บัตรประชาชนดิจิทัล": "Digital ID card", "ทะเบียนบ้านออนไลน์": "Online house registration", "สวัสดิการอัจฉริยะ": "Smart welfare", "ภาษีท้องถิ่น e-Tax": "Local e-Tax",
    "บริการธุรกิจ": "Business services", "จดทะเบียน ขออนุญาต และสิทธิประโยชน์การลงทุนแบบเร่งด่วน": "Fast-track registration, permits and investment incentives",
    "จดทะเบียนธุรกิจ 1 วัน": "1-day business registration", "e-Permit อนุญาตอัจฉริยะ": "e-Permit smart licensing", "จับคู่ซัพพลายเออร์ EEC": "EEC supplier matching", "สิทธิประโยชน์ BOI": "BOI incentives",
    "บริการนักท่องเที่ยว": "Visitor services", "วางแผน จอง และเที่ยวทั่วระยองด้วย Digital Tourist Pass": "Plan, book and tour Rayong with the Digital Tourist Pass",
    "จองเรือ-ที่พักเกาะเสม็ด": "Ko Samet boats & stays", "แจ้งเตือนสภาพทะเล": "Sea condition alerts",
    "บริการภาครัฐ": "Government services", "ติดต่อราชการไร้กระดาษ ติดตามทุกเรื่องแบบเรียลไทม์": "Paperless dealings with government, tracked in real time",
    "นัดหมายราชการล่วงหน้า": "Book appointments ahead", "ติดตามสถานะคำร้อง": "Track requests", "Rayong Voice รับฟังประชาชน": "Rayong Voice citizen feedback",
    "บริการฉุกเฉิน": "Emergency services", "แจ้งเหตุ ขอความช่วยเหลือ ตอบสนองภายใน 8 นาที": "Report incidents and get help, with an 8-minute response",
    "SOS แจ้งเหตุด่วน 1 ปุ่ม": "One-tap SOS", "แผนที่จุดอพยพ": "Evacuation map", "แจ้งเตือนภัยพิบัติ": "Disaster alerts", "ติดตามรถพยาบาลเรียลไทม์": "Live ambulance tracking",
    "โครงสร้างพื้นฐานดิจิทัลและทักษะแห่งอนาคตสำหรับทุกคน": "Digital infrastructure and future skills for everyone",
    "Free WiFi 1,200 จุด": "Free WiFi at 1,200 spots", "คอร์สทักษะดิจิทัลฟรี": "Free digital skills courses",
    "ตัวชี้วัดเศรษฐกิจจังหวัด": "Provincial economic indicators", "สาขาการลงทุนสำคัญ": "Key investment sectors",
    "GPP ต่อหัว": "GPP per capita", "1.12 ล้านบาท": "1.12 million THB", "อันดับ 1 ของประเทศ": "No. 1 in Thailand",
    "การเติบโต GPP": "GPP growth", "สูงกว่าค่าเฉลี่ยประเทศ 2 เท่า": "Twice the national average",
    "การจ้างงานใหม่": "New jobs", "42,000 ตำแหน่ง": "42,000 jobs", "ในปี 2026": "in 2026",
    "FDI ไหลเข้า": "FDI inflow", "9.4 หมื่นล้านบาท": "94 billion THB", "+22% จากปีก่อน": "+22% year on year",
    "เขตพัฒนาพิเศษภาคตะวันออก (EEC)": "Eastern Economic Corridor (EEC)", "ศูนย์กลางการลงทุนอุตสาหกรรมแห่งอนาคตของอาเซียน": "ASEAN's investment hub for future industries",
    "อุตสาหกรรมอัจฉริยะ": "Smart industry", "ยานยนต์ไฟฟ้า แบตเตอรี่ หุ่นยนต์ และระบบอัตโนมัติ": "EVs, batteries, robotics and automation", "2.4 แสนล้านบาท": "240 billion THB",
    "ศูนย์นวัตกรรม EECi": "EECi innovation hub", "วังจันทร์วัลเลย์ — เมืองนวัตกรรมและศูนย์วิจัยระดับโลก": "Wangchan Valley — an innovation city with world-class research", "4.6 หมื่นล้านบาท": "46 billion THB",
    "พลังงานหมุนเวียน": "Renewable energy", "โซลาร์ฟาร์ม ไฮโดรเจนสีเขียว และระบบกักเก็บพลังงาน": "Solar farms, green hydrogen and energy storage", "8.2 หมื่นล้านบาท": "82 billion THB",
    "โลจิสติกส์": "Logistics", "ท่าเรือมาบตาพุดเฟส 3 รถไฟความเร็วสูง และสนามบินอู่ตะเภา": "Map Ta Phut Port Phase 3, high-speed rail and U-Tapao Airport", "1.6 แสนล้านบาท": "160 billion THB",
    "เทคโนโลยีพาร์ค": "Technology parks", "Smart Park และเขตส่งเสริมเศรษฐกิจดิจิทัล": "Smart Park and digital economy promotion zones", "3.8 หมื่นล้านบาท": "38 billion THB",
    "ยื่นเอกสาร คำร้องทั่วไป และติดตามสถานะแบบเรียลไทม์": "Submit documents and general requests and track them in real time",
    "ชำระภาษีและค่าธรรมเนียม": "Pay taxes and fees", "ภาษีที่ดิน สิ่งปลูกสร้าง ป้าย และค่าธรรมเนียมท้องถิ่น": "Land, building and signboard taxes and local fees",
    "จองคิวรับบริการ": "Book a service queue", "จองคิวล่วงหน้าทุกหน่วยงาน ลดเวลารอที่สำนักงาน": "Book ahead at any office and spend less time waiting",
    "แจ้งเรื่องร้องเรียน": "File a complaint", "แจ้งปัญหาความเดือดร้อน พร้อมติดตามผลภายใน 15 วัน": "Report a problem and get a follow-up within 15 days",
    "ขอใบอนุญาตอิเล็กทรอนิกส์": "e-Licences", "ใบอนุญาตก่อสร้าง ประกอบกิจการ และใบรับรองต่าง ๆ": "Building and business permits and certificates",
    "บริการสำหรับผู้ประกอบการ": "Services for businesses", "จดทะเบียนพาณิชย์ ขอรับการส่งเสริมการลงทุน EEC": "Commercial registration and EEC investment promotion",

    // ----- Agencies, news, contact -----
    "กระทรวงมหาดไทย": "Ministry of Interior", "มท": "MOI", "สำนักงาน EEC": "EEC Office",
    "การท่องเที่ยวแห่งประเทศไทย": "Tourism Authority of Thailand", "ททท": "TAT",
    "กรมส่งเสริมการปกครองท้องถิ่น": "Department of Local Administration", "สถ": "DLA",
    "สำนักงานส่งเสริมเศรษฐกิจดิจิทัล": "Digital Economy Promotion Agency",
    "องค์การบริหารส่วนจังหวัดระยอง": "Rayong Provincial Administrative Organization", "อบจ": "PAO",
    "ระยองเปิดตัวระบบ Digital Twin เมืองเฟส 2 ครอบคลุม 6 เขตอัจฉริยะ": "Rayong launches Digital Twin Phase 2 across 6 smart zones",
    "ศูนย์บัญชาการเมืองอัจฉริยะเชื่อมข้อมูลเรียลไทม์จากเซนเซอร์กว่า 5,000 จุด พยากรณ์จราจรและคุณภาพอากาศล่วงหน้า 48 ชั่วโมง": "The smart city command centre links live data from over 5,000 sensors to forecast traffic and air quality 48 hours ahead.",
    "โซลาร์ฟาร์มลอยน้ำอ่างเก็บน้ำดอกกรายผลิตไฟฟ้าทะลุ 48 GWh": "Dok Krai floating solar farm passes 48 GWh",
    "โครงการพลังงานสะอาดที่ใหญ่ที่สุดของจังหวัด ลดการปล่อยคาร์บอนเทียบเท่าปลูกต้นไม้ 2.1 ล้านต้น": "The province's largest clean energy project cuts carbon by as much as planting 2.1 million trees.",
    "เทศกาลผลไม้และของดีเมืองระยอง 2026 — บุฟเฟ่ต์ทุเรียนจากสวนอัจฉริยะ": "Rayong Fruit Festival 2026 — a durian buffet from smart orchards",
    "พบสุดยอดทุเรียน มังคุด เงาะจากสวนเกษตรแม่นยำ 120 สวน พร้อมระบบจองคิวเข้าสวนผ่านแอป 12–21 มิ.ย. นี้": "Top durian, mangosteen and rambutan from 120 precision-farming orchards, with orchard visits booked in the app, 12–21 Jun.",
    "เปิดรับฟังความเห็นแผนแม่บท Rayong Smart Province ระยะ 3 (2027–2030)": "Public consultation on the Rayong Smart Province master plan, phase 3 (2027–2030)",
    "ประชาชนร่วมออกแบบอนาคตเมืองผ่านแพลตฟอร์ม Rayong Voice ได้ตั้งแต่วันนี้ถึง 30 มิ.ย. 2026": "Help design the city's future on the Rayong Voice platform from today until 30 Jun 2026.",
    "EV Shuttle สายใหม่เชื่อมสถานีรถไฟความเร็วสูง–บ้านเพ–หาดแม่รำพึง": "New EV Shuttle route links the high-speed rail station, Ban Phe and Mae Ramphueng Beach",
    "รถรับส่งไฟฟ้าไร้คนขับระดับ 4 ทดลองวิ่งเส้นทางท่องเที่ยวชายฝั่ง ฟรีตลอดเดือนมิถุนายน": "Level 4 driverless electric shuttles trial the coastal tourist route, free throughout June.",
    "EECi วังจันทร์วัลเลย์ต้อนรับสตาร์ทอัพดีพเทคใหม่ 24 ทีมจาก 8 ประเทศ": "EECi Wangchan Valley welcomes 24 new deep-tech startups from 8 countries",
    "โครงการบ่มเพาะ Rayong Deep Tech Accelerator รุ่นที่ 4 เน้นพลังงานสะอาด หุ่นยนต์ และเกษตรอัจฉริยะ": "Rayong Deep Tech Accelerator cohort 4 focuses on clean energy, robotics and smart farming.",
    "สายด่วนจังหวัด": "Provincial hotline", "อีเมล": "Email", "ที่ตั้ง": "Address", "พอร์ทัลบริการ": "Service portal",
    "ศูนย์ราชการจังหวัดระยอง ถ.สุขุมวิท ต.เนินพระ อ.เมืองระยอง 21150": "Rayong Government Centre, Sukhumvit Rd, Noen Phra, Mueang Rayong 21150",

    // ----- Chat replies -----
    "🏝️ ไปเกาะเสม็ด: นั่งเรือจากท่าเรือบ้านเพ ออกทุก 30 นาที (06:00–18:00 น.) ใช้เวลา 40 นาที\n\n• จองตั๋วล่วงหน้าผ่าน Digital Tourist Pass ได้เลย\n• วันนี้คลื่นสูง 0.8 ม. — เดินเรือปกติ\n• ความหนาแน่นนักท่องเที่ยว: ปานกลาง แนะนำรอบเช้า\n\nอยากให้ผมช่วยวางแผนทริป 2 วัน 1 คืนไหมครับ?":
      "🏝️ Getting to Ko Samet: take a boat from Ban Phe pier, every 30 minutes (06:00–18:00), about 40 minutes.\n\n• Book tickets ahead with the Digital Tourist Pass\n• Waves today 0.8 m — boats running normally\n• Crowd level: moderate, morning trips recommended\n\nWould you like help planning a 2-day, 1-night trip?",
    "💼 ขอใบอนุญาตธุรกิจผ่านระบบ e-Permit:\n\n1. ยืนยันตัวตนด้วย One Province One ID\n2. เลือกประเภทธุรกิจ — ระบบแนะนำเอกสารอัตโนมัติ\n3. ยื่นออนไลน์ อนุมัติภายใน 1–3 วันทำการ\n\nธุรกิจทั่วไปจดทะเบียนเสร็จใน 1 วัน หากอยู่ในเขตส่งเสริม EEC มีสิทธิประโยชน์ภาษีเพิ่มเติมครับ":
      "💼 Business licences through e-Permit:\n\n1. Verify your identity with One Province One ID\n2. Choose your business type — the system lists the documents you need\n3. Apply online; approval within 1–3 working days\n\nMost businesses are registered in 1 day. Inside EEC promotion zones you get extra tax incentives.",
    "🌤️ คุณภาพอากาศระยองวันนี้:\n\n• AQI: 42 (ดี) 🟢\n• PM2.5: 12.4 µg/m³ — ต่ำกว่าเกณฑ์มาตรฐาน\n• อุณหภูมิ 31°C ลมตะวันออกเฉียงใต้ 12 กม./ชม.\n\nทั้ง 8 อำเภออยู่ในเกณฑ์ดี เหมาะกับกิจกรรมกลางแจ้งครับ ข้อมูลจากเซนเซอร์ 480 จุดทั่วจังหวัด":
      "🌤️ Rayong air quality today:\n\n• AQI: 42 (good) 🟢\n• PM2.5: 12.4 µg/m³ — below the standard limit\n• 31°C, south-easterly wind 12 km/h\n\nAll 8 districts are in the good range — fine for outdoor activities. Data from 480 sensors across the province.",
    "📈 สิทธิประโยชน์การลงทุนในระยอง (เขต EEC):\n\n• ยกเว้นภาษีเงินได้นิติบุคคลสูงสุด 13 ปี\n• Smart Visa สำหรับผู้เชี่ยวชาญต่างชาติ\n• เขตนวัตกรรม EECi — เช่าที่ดินระยะยาว 50 ปี\n• อุตสาหกรรมเป้าหมาย: EV, หุ่นยนต์, พลังงานสะอาด, ไบโอเทค\n\nสนใจอุตสาหกรรมไหนเป็นพิเศษครับ? ผมช่วยเชื่อมต่อทีม EEC OSS ให้ได้":
      "📈 Investment incentives in Rayong (EEC zone):\n\n• Corporate income tax exemption for up to 13 years\n• Smart Visa for foreign experts\n• EECi innovation zone — 50-year land leases\n• Target industries: EVs, robotics, clean energy, biotech\n\nWhich industry interests you? I can connect you with the EEC OSS team.",
    "🏛️ บริการภาครัฐดิจิทัล 248 บริการ ใช้ได้เลยไม่ต้องไปสำนักงาน:\n\n• งานทะเบียนราษฎร์ — แอป ThaID + Rayong One\n• นัดหมายล่วงหน้า ลดเวลารอ 78%\n• ติดตามสถานะคำร้องเรียลไทม์\n\nต้องการทำเรื่องอะไรครับ? บอกผมได้เลย เดี๋ยวพาไปถูกช่องทาง":
      "🏛️ 248 digital government services you can use without visiting an office:\n\n• Civil registration — ThaID + Rayong One apps\n• Book appointments ahead and wait 78% less\n• Track your requests in real time\n\nWhat do you need to do? Tell me and I'll point you to the right channel.",
    "🚄 การเดินทางอัจฉริยะในระยอง:\n\n• สถานีชาร์จ EV 320 สถานีทั่วจังหวัด — ดูแผนที่ในแอป Rayong Transit\n• EV Shuttle เชื่อมเมือง–นิคม–ชายหาด ทุก 15 นาที\n• รถไฟความเร็วสูง 3 สนามบิน (เปิด 2027) — กรุงเทพฯ–ระยอง 60 นาที\n\nจะเดินทางจากไหนไปไหนครับ? ผมช่วยวางเส้นทางให้ได้":
      "🚄 Smart mobility in Rayong:\n\n• 320 EV charging stations province-wide — see the map in the Rayong Transit app\n• EV Shuttle linking town, estates and beaches every 15 minutes\n• 3-airport high-speed rail (opening 2027) — Bangkok to Rayong in 60 minutes\n\nWhere are you travelling from and to? I can plan the route.",
    "🌆 Rayong SMART PROVINCE — เส้นทางสู่อนาคต:\n\n• 2025: วางรากฐาน — Command Center + IoT 5,000 จุด ✅\n• 2027: เชื่อมโยง — รถไฟความเร็วสูง + บริการรัฐไร้กระดาษ 100%\n• 2030: เมืองตอบสนอง — Digital Twin เรียลไทม์ + พลังงานสะอาด 50%\n• 2035: สมบูรณ์แบบ — เมืองคาร์บอนต่ำ ศูนย์นวัตกรรมอาเซียน\n\nเลื่อนดูไทม์ไลน์ฉบับเต็มได้ที่ส่วน \"วิสัยทัศน์ 2035\" ด้านล่างครับ":
      "🌆 Rayong SMART PROVINCE — the road ahead:\n\n• 2025: Foundations — Command Center + 5,000 IoT points ✅\n• 2027: Connected — high-speed rail + 100% paperless government\n• 2030: Responsive city — real-time Digital Twin + 50% clean energy\n• 2035: Complete — a low-carbon city and ASEAN innovation hub\n\nScroll down to \"Vision 2035\" for the full timeline.",

    // ----- Poll -----
    "ท่านอยากให้จังหวัดระยองเร่งพัฒนาด้านใดมากที่สุดในปี 2569?": "What should Rayong prioritise most in 2026?",
    "ระบบขนส่งสาธารณะและการจราจร": "Public transport and traffic", "สิ่งแวดล้อม คุณภาพอากาศ และชายหาด": "Environment, air quality and beaches",
    "เศรษฐกิจชุมชนและการท่องเที่ยว": "Community economy and tourism", "สาธารณสุขและคุณภาพชีวิต": "Public health and quality of life",

    // ----- Banners -----
    "7 แนวทางสำคัญ ผู้ว่าราชการจังหวัดระยอง “สร้างระยองน่าอยู่”": "The Governor's 7 key policies: “Building a liveable Rayong”",
    "แผน 14 ประเทศไทยต้องไปต่อ! สแกนเพื่อร่วมแสดงความคิดเห็นต่ออนาคตประเทศไทย": "The 14th National Plan: scan to share your views on Thailand's future",
    "Online Survey 2569 แบบสำรวจความพึงพอใจของประชาชนต่อการให้บริการตามคู่มือสำหรับประชาชน": "Online Survey 2026: public satisfaction with services under the citizen's manual",
    "ITA จังหวัดระยอง การประเมินคุณธรรมและความโปร่งใสในการดำเนินงานของหน่วยงานภาครัฐ": "Rayong ITA: integrity and transparency assessment of public agencies",
    "No Gift Policy ประกาศเจตนารมณ์ “สุจริต โปร่งใส จังหวัดระยองใสสะอาด ๒๕๖๙”": "No Gift Policy: our pledge for an “honest, transparent and clean Rayong 2026”",

    // ----- Information hub -----
    "ยุทธศาสตร์การพัฒนาจังหวัดระยอง": "Rayong development strategy", "แผนพัฒนาจังหวัด": "Provincial development plan",
    "โครงสร้างจังหวัดระยอง": "Rayong provincial structure", "ส่วนราชการและหน่วยงาน": "Government offices and agencies",
    "บรรยายสรุปจังหวัดระยอง": "Rayong provincial briefing", "ข้อมูลภาพรวมจังหวัด": "Provincial overview",
    "รายงานประจำปีจังหวัดระยอง": "Rayong annual report", "รายงานผลการดำเนินงาน": "Performance report",
    "ศูนย์กลางข้อมูลเปิดภาครัฐ (ข้อมูลจังหวัดระยอง)": "Government open data (Rayong data)",
    "สถิติจังหวัดระยอง": "Rayong provincial statistics", "สำนักงานสถิติจังหวัดระยอง": "Rayong Provincial Statistical Office",
    "หนังสือ “Tourist Rayong”": "“Tourist Rayong” book", "หนังสือประชาสัมพันธ์": "Promotional publication",
    "ความมั่นคงปลอดภัยด้านสารสนเทศจังหวัดระยอง": "Rayong information security", "นโยบายและแนวปฏิบัติ": "Policy and guidelines",
    "ระบบสารบรรณอิเล็กทรอนิกส์": "Electronic document system", "รับ–ส่งหนังสือราชการ ลงทะเบียนและติดตามเอกสาร": "Send, receive, register and track official letters",
    "ระบบจองห้องประชุม": "Meeting room booking", "ตรวจสอบห้องว่างและจองห้องประชุมศาลากลางจังหวัด": "Check and book Provincial Hall meeting rooms",
    "ระบบปฏิทินและนัดหมาย": "Calendar and appointments", "ปฏิทินงานและนัดหมายของผู้บริหารจังหวัด": "Schedules and appointments of provincial executives",
    "หนังสือเวียน สนจ.รย.": "Rayong Provincial Office circulars", "หนังสือเวียนจากสำนักงานจังหวัดระยอง": "Circulars from the Rayong Provincial Office",
    "เข้าสู่ระบบ": "Sign in",
    "วันนี้": "Today", "พรุ่งนี้": "Tomorrow", "สัปดาห์นี้": "This week",
    "ประชุมคณะกรมการจังหวัดและหัวหน้าส่วนราชการ ประจำเดือน": "Monthly meeting of the provincial committee and heads of government offices",
    "ห้องประชุมพลา ศาลากลางจังหวัดระยอง": "Phla Meeting Room, Rayong Provincial Hall",
    "ประชุมติดตามการแก้ไขปัญหาขยะและน้ำเสียในพื้นที่": "Follow-up meeting on local waste and wastewater problems",
    "ห้องประชุมเพ ศาลากลางจังหวัดระยอง": "Phe Meeting Room, Rayong Provincial Hall",
    "ตรวจเยี่ยมการให้บริการประชาชน ศูนย์ดำรงธรรมอำเภอ": "Inspection of public services at the district Damrongdhama Center",
    "ที่ว่าการอำเภอแกลง": "Klaeng District Office",
    "ประชุมคณะทำงานศูนย์ดำรงธรรมจังหวัดระยอง": "Rayong Damrongdhama Center working group meeting",
    "ประชุมคณะอนุกรรมการขับเคลื่อนการท่องเที่ยวจังหวัด": "Provincial tourism subcommittee meeting",
    "ห้องประชุมแกลง ศาลากลางจังหวัดระยอง": "Klaeng Meeting Room, Rayong Provincial Hall",
    "หนังสือเวียนและแจ้งเวียนจากสำนักงานจังหวัด": "Circulars and notices from the Provincial Office",
    "กลุ่มงานศูนย์ดำรงธรรม": "Damrongdhama Center Group", "แบบฟอร์มร้องเรียน ร้องทุกข์ และคู่มือการรับเรื่อง": "Complaint and petition forms, and the intake manual",
    "กลุ่มงานยุทธศาสตร์และข้อมูลเพื่อการพัฒนาจังหวัด": "Strategy and Development Information Group", "แผนพัฒนาจังหวัด แผนปฏิบัติราชการ และข้อมูลจังหวัด": "Development plans, action plans and provincial data",
    "กลุ่มงานอำนวยการ": "General Administration Group", "งานสารบรรณ งานการเงิน บัญชี และพัสดุ": "Correspondence, finance, accounting and supplies",
    "กลุ่มงานบริหารทรัพยากรบุคคล": "Human Resources Group", "การบรรจุ แต่งตั้ง และพัฒนาบุคลากร": "Recruitment, appointments and staff development",
    "หน่วยตรวจสอบภายใน": "Internal Audit Unit", "รายงานการตรวจสอบและการควบคุมภายใน": "Audit and internal control reports",
    "รับเรื่องตลอด 24 ชั่วโมง": "Open 24 hours", "ศูนย์ดำรงธรรมจังหวัดระยอง ศาลากลางจังหวัดระยอง": "Rayong Damrongdhama Center, Rayong Provincial Hall",
    "แจ้งเรื่องร้องเรียน/ร้องทุกข์": "File a complaint or petition", "ติดตามเรื่องร้องเรียน/ร้องทุกข์": "Track a complaint or petition",
    "แจ้งเรื่องร้องเรียนทุจริต (จังหวัด)": "Report corruption (province)", "ติดตามเรื่องร้องเรียนทุจริต": "Track a corruption report",
    "ร้องเรียนทุจริต ป.ป.ช.": "Report corruption to the NACC", "ร้องเรียนทุจริต ป.ป.ท.": "Report corruption to the PACC",
    "ยื่นเรื่องผ่านช่องทางที่สะดวก": "Submit through any convenient channel", "ศูนย์ดำรงธรรมตรวจสอบและลงทะเบียน": "The Center checks and registers it",
    "ส่งเรื่องให้หน่วยงานที่เกี่ยวข้องดำเนินการ": "It is passed to the responsible agency", "แจ้งผลและติดตามได้ทางออนไลน์": "Get results and follow up online",

    // ----- Government systems & related links -----
    "ระบบจัดซื้อจัดจ้างภาครัฐ (e-GP)": "Government e-Procurement (e-GP)", "กรมบัญชีกลาง": "Comptroller General's Department",
    "ระบบบริหารการเงินการคลังภาครัฐ (GFMIS)": "Government Fiscal Management (GFMIS)",
    "ระบบติดตามโครงการ (eMENSCR)": "Project monitoring (eMENSCR)", "สำนักงานสภาพัฒนาการเศรษฐกิจและสังคมแห่งชาติ": "Office of the National Economic and Social Development Council",
    "ศูนย์กลางข้อมูลเปิดภาครัฐ": "Government Open Data Center", "สำนักงานพัฒนารัฐบาลดิจิทัล": "Digital Government Development Agency",
    "ศูนย์รวมข้อมูลเพื่อติดต่อราชการ": "Government Information Center", "สำนักงาน ก.พ.ร.": "Office of the Public Sector Development Commission",
    "Biz Portal บริการภาครัฐเพื่อธุรกิจ": "Biz Portal: government services for business",
    "ระบบกลางทางกฎหมาย": "Central Law System", "สำนักงานคณะกรรมการกฤษฎีกา": "Office of the Council of State",
    "ศูนย์ดำรงธรรม กระทรวงมหาดไทย": "Damrongdhama Center, Ministry of Interior",
    "ระบบประเมิน ITA ออนไลน์": "ITA online assessment", "สำนักงาน ป.ป.ช.": "Office of the NACC",
    "ฐานข้อมูลหน่วยงานภาครัฐ": "Government agency database", "สำนักงานคณะกรรมการข้อมูลข่าวสารของราชการ": "Office of the Official Information Commission",
    "e-Service จังหวัดระยอง": "Rayong e-Service",
    "ข้อมูลอำเภอในจังหวัดระยอง": "Districts of Rayong", "8 อำเภอ 54 ตำบล 439 หมู่บ้าน": "8 districts · 54 sub-districts · 439 villages",
    "เว็บไซต์จังหวัดระยอง": "Rayong Province website", "สถิติจังหวัด": "Provincial statistics", "ข้อมูลด้านการเกษตร": "Agriculture",
    "สำนักงานอุตสาหกรรมจังหวัดระยอง": "Rayong Provincial Industry Office", "ข้อมูลด้านอุตสาหกรรม": "Industry",
    "กระทรวงการท่องเที่ยวและกีฬา": "Ministry of Tourism and Sports", "ข้อมูลด้านการท่องเที่ยว": "Tourism",
    "สำนักงานส่งเสริมวิสาหกิจขนาดกลางและขนาดย่อม": "Office of SMEs Promotion", "สสว.": "OSMEP", "ศาลปกครอง": "Administrative Court",
    "Social Network หน่วยงานในจังหวัด": "Social media of provincial agencies", "เพจและช่องทางออนไลน์": "Pages and online channels",
    "หมายเลขโทรศัพท์ฉุกเฉิน": "Emergency numbers", "เบอร์สำคัญในจังหวัด": "Key numbers in the province",
  };

  // Chat suggestion → English keywords that should reach the same reply
  const CHAT_KEYWORDS = [
    ["samet", "island", "boat", "ferry", "beach", "travel", "tour", "trip"],
    ["business", "licen", "permit", "register", "company", "shop"],
    ["air", "weather", "dust", "pm2", "rain", "aqi"],
    ["invest", "incentive", "boi", "eec", "factory", "estate"],
    ["service", "government", "document", "id card", "contact", "registration"],
    ["charg", "ev", "train", "rail", "transport", "bus", "shuttle", "getting around"],
    ["smart", "vision", "plan", "2035", "future"],
  ];

  const MONTHS = { "ม.ค.": "Jan", "ก.พ.": "Feb", "มี.ค.": "Mar", "เม.ย.": "Apr", "พ.ค.": "May", "มิ.ย.": "Jun", "ก.ค.": "Jul", "ส.ค.": "Aug", "ก.ย.": "Sep", "ต.ค.": "Oct", "พ.ย.": "Nov", "ธ.ค.": "Dec" };
  const MONTHS_FULL = { "มกราคม": "January", "กุมภาพันธ์": "February", "มีนาคม": "March", "เมษายน": "April", "พฤษภาคม": "May", "มิถุนายน": "June", "กรกฎาคม": "July", "สิงหาคม": "August", "กันยายน": "September", "ตุลาคม": "October", "พฤศจิกายน": "November", "ธันวาคม": "December" };
  const TH = /[฀-๿]/;
  const ce = (y) => (+y > 2400 ? +y - 543 : +y);
  const monthRe = new RegExp(`(?:(\\d{1,2}(?:–\\d{1,2})?) )?(${Object.keys(MONTHS).map((m) => m.replace(/\./g, "\\.")).join("|")})(?: (\\d{4}))?`, "g");
  const fullMonthRe = new RegExp(`(${Object.keys(MONTHS_FULL).join("|")})(?: (\\d{4}))?`, "g");

  // Generated labels: "<prefix><content>" where the content is itself translatable
  const PREFIXES = [
    [/^ดาวน์โหลดเอกสาร (.+)$/s, "Download document: "], [/^Download (.+)$/s, "Download "],
    [/^ดูรายละเอียด (.+)$/s, "View details: "], [/^สำรวจโซน (.+)$/s, "Explore zone: "], [/^โลโก้ (.+)$/s, "Logo: "],
    [/^กิจกรรมวันที่ (\d+)$/, "Events on day "], [/^ประกาศ (.+)$/s, "Posted "], [/^ยื่นข้อเสนอ (.+)$/s, "Bids due "],
    [/^รับฟังความเห็นถึง (.+)$/s, "Comments until "], [/^Updated (.+)$/s, "Updated "],
  ];

  const cache = new Map();
  function translate(raw) {
    if (!raw || !TH.test(raw)) return raw;
    if (cache.has(raw)) return cache.get(raw);
    const lead = raw.match(/^[\s·]*/)[0], tail = raw.match(/\s*$/)[0];
    const s = raw.slice(lead.length).trim();
    let out = TEXT[s];
    // Two known strings joined by a space, e.g. an image alt of "<person> <activity>"
    if (out === undefined) {
      const head = Object.keys(TEXT).filter((k) => s.startsWith(k + " ") && TEXT[s.slice(k.length + 1)] !== undefined)[0];
      if (head) out = `${TEXT[head]}: ${TEXT[s.slice(head.length + 1)]}`;
    }
    if (out === undefined) {
      for (const [re, en] of PREFIXES) {
        const m = s.match(re);
        if (m) { out = en + translate(m[1]); break; }
      }
    }
    if (out === undefined && s.includes(" · ")) out = s.split(" · ").map(translate).join(" · ");
    if (out === undefined) out = rules(s);
    out = lead + out + tail;
    cache.set(raw, out);
    return out;
  }

  // Dates, times, money and units inside otherwise untranslated text
  function rules(s) {
    return s
      .replace(monthRe, (_, d, m, y) => [d, MONTHS[m], y && ce(y)].filter(Boolean).join(" "))
      .replace(fullMonthRe, (_, m, y) => [MONTHS_FULL[m], y && ce(y)].filter(Boolean).join(" "))
      .replace(/พ\.ศ\. (\d{4})/g, (_, y) => ce(y))
      .replace(/(\d{1,2}[:.]\d{2}(?:–\d{1,2}[:.]\d{2})?) น\./g, "$1")
      .replace(/([\d,]+(?:–[\d,]+)?) บาท\/คืน/g, "THB $1/night")
      .replace(/([\d,.]+(?:–[\d,]+)?) บาท/g, "THB $1")
      .replace(/^ปี (\d{4})$/, (_, y) => ce(y))
      .trim();
  }

  window.I18N_EN = { translate, chatKeywords: CHAT_KEYWORDS };
})();
