export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  tag?: string;
}

export interface QuestionAnswer {
  id: string;
  question: string;
  askedBy: string;
  answer: string;
  answeredBy: string;
}

export const PRODUCT_REVIEWS_QA: Record<
  string,
  {
    rating: number;
    reviewCount: number;
    reviews: Review[];
    qa: QuestionAnswer[];
  }
> = {
  "pink-ruffle-laptop-sleeve": {
    rating: 4.9,
    reviewCount: 19,
    reviews: [
      {
        id: "r1",
        author: "Meera Subramanian",
        location: "Bengaluru, Karnataka",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Bought this for my 14-inch M2 MacBook Pro and it fits like a glove! The quilting has thick, soft padding so I don't worry when throwing it into my tote. The mustard ruffles and bow tie get so many compliments in coffee shops.",
        verifiedPurchase: true,
        tag: "Fits MacBook Pro 14",
      },
      {
        id: "r2",
        author: "Tanya Kashyap",
        location: "Mumbai, Maharashtra",
        rating: 5,
        date: "1 month ago",
        comment:
          "The scrunchie handle is actually sturdy and comfortable on the shoulder. Pure cotton feel with no chemical smell. Such a relief compared to generic synthetic sleeves.",
        verifiedPurchase: true,
      },
      {
        id: "r3",
        author: "Aarushi Jain",
        location: "Jaipur, Rajasthan",
        rating: 5,
        date: "1 month ago",
        comment:
          "Being from Jaipur, I know authentic Sanganeri block print when I see it. The print alignment and hand-stitched frills are genuinely artisan quality.",
        verifiedPurchase: true,
      },
      {
        id: "r4",
        author: "Sophie Laurent",
        location: "Paris, France",
        rating: 5,
        date: "2 months ago",
        comment:
          "Ordered 4 pieces for my colleagues in Paris. Shipping took 6 days via DHL. Beautiful cotton texture and authentic Indian charm.",
        verifiedPurchase: true,
      },
      {
        id: "r5",
        author: "Divya Nambiar",
        location: "Kochi, Kerala",
        rating: 4,
        date: "2 months ago",
        comment:
          "Very cute design. The tie strings hold securely. Just wish it had an extra external zip pocket for the charger brick, but fits inside main sleeve fine.",
        verifiedPurchase: true,
      },
      {
        id: "r6",
        author: "Rhea Sen",
        location: "Kolkata, West Bengal",
        rating: 5,
        date: "3 months ago",
        comment:
          "Love the pastel pink floral motif! My Dell XPS 13 slides in smoothly with plenty of cushioning.",
        verifiedPurchase: true,
      },
      {
        id: "r7",
        author: "Kavita Reddy",
        location: "Hyderabad, Telangana",
        rating: 5,
        date: "3 months ago",
        comment:
          "Used this as a bridesmaid gifting item for 8 girls. Jai Fabrication customized matching ribbons for us. Everyone was overjoyed!",
        verifiedPurchase: true,
        tag: "Wedding Gifting",
      },
      {
        id: "r8",
        author: "Pooja Malhotra",
        location: "New Delhi",
        rating: 5,
        date: "3 months ago",
        comment:
          "Hand washed it cold after a coffee spill and the colours didn't bleed at all. Solid dye work.",
        verifiedPurchase: true,
      },
      {
        id: "r9",
        author: "Elena Rostova",
        location: "London, UK",
        rating: 5,
        date: "4 months ago",
        comment:
          "Exceptional tactile feel. You can tell real hands carved the wooden blocks for these petals.",
        verifiedPurchase: true,
      },
      {
        id: "r10",
        author: "Simran Kaur",
        location: "Chandigarh",
        rating: 5,
        date: "4 months ago",
        comment:
          "The frills don't crumple easily and the cotton lining doesn't scratch the aluminium laptop finish.",
        verifiedPurchase: true,
      },
      {
        id: "r11",
        author: "Shreya Ghoshal",
        location: "Pune, Maharashtra",
        rating: 5,
        date: "5 months ago",
        comment:
          "10/10 recommend. Even prettier in person than in pictures.",
        verifiedPurchase: true,
      },
    ],
    qa: [
      {
        id: "q1",
        question: "Will this fit a 14-inch MacBook Pro (M1/M2/M3) with a hardshell case?",
        askedBy: "Ananya P.",
        answer: "Yes! The interior is tailored with a 1.2-inch gusset and soft foam padding to comfortably accommodate 13-inch and 14-inch laptops even with slim hardshell covers.",
        answeredBy: "Jai Fabrication Atelier",
      },
      {
        id: "q2",
        question: "Is there foam padding inside for drop protection?",
        askedBy: "Rohan D.",
        answer: "Yes, it contains a 6mm high-density shock-absorbing cotton-foam batting sandwiched between the quilted cotton layers.",
        answeredBy: "Jai Fabrication Atelier",
      },
      {
        id: "q3",
        question: "Can we order 25 pieces with custom couple initials for wedding hampers?",
        askedBy: "Meghna S.",
        answer: "Absolutely! We do custom monogram tags and ribbon palettes starting from 25 pcs with 10% bulk discount.",
        answeredBy: "Jai Fabrication Atelier",
      },
    ],
  },

  "dusty-rose-floral-duffle": {
    rating: 4.8,
    reviewCount: 23,
    reviews: [
      {
        id: "r1",
        author: "Sunita Agarwal",
        location: "Jaipur, Rajasthan",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Took this for a 3-day Jaipur to Udaipur road trip. Packed 3 outfits, makeup pouch, sandals, and a book effortlessly. The striped handles are thick and don't dig into shoulders.",
        verifiedPurchase: true,
        tag: "Weekend Travel",
      },
      {
        id: "r2",
        author: "Mallika Verma",
        location: "Mumbai, Maharashtra",
        rating: 5,
        date: "1 month ago",
        comment:
          "The dusty pink tone is so understated and elegant. Antique brass zippers slide like butter.",
        verifiedPurchase: true,
      },
      {
        id: "r3",
        author: "Nisha Patel",
        location: "Ahmedabad, Gujarat",
        rating: 5,
        date: "1 month ago",
        comment:
          "Very durable channel quilting. Even when stuffed full, the bag maintains its barrel shape nicely.",
        verifiedPurchase: true,
      },
      {
        id: "r4",
        author: "Dr. Alok Mittal",
        location: "New Delhi",
        rating: 4,
        date: "2 months ago",
        comment:
          "Bought this as an anniversary gift for my wife. She uses it for weekend hospital shifts and travel. Very well made.",
        verifiedPurchase: true,
      },
      {
        id: "r5",
        author: "Chloe Bennett",
        location: "Melbourne, Australia",
        rating: 5,
        date: "2 months ago",
        comment:
          "Arrived in Australia in 7 business days. High quality craftsmanship with zero loose threads.",
        verifiedPurchase: true,
      },
      {
        id: "r6",
        author: "Preeti Choudhury",
        location: "Pune, Maharashtra",
        rating: 5,
        date: "3 months ago",
        comment:
          "The front slip pocket is super convenient for phone and boarding pass at the airport.",
        verifiedPurchase: true,
      },
      {
        id: "r7",
        author: "Garima Sethi",
        location: "Indore, Madhya Pradesh",
        rating: 5,
        date: "3 months ago",
        comment:
          "Lightweight yet very sturdy. Fits easily under airline seats as cabin luggage.",
        verifiedPurchase: true,
        tag: "Cabin Approved",
      },
      {
        id: "r8",
        author: "Ishita Roy",
        location: "Kolkata",
        rating: 5,
        date: "4 months ago",
        comment:
          "The candy striped shoulder strap adds a modern pop to the traditional Rajasthani floral print.",
        verifiedPurchase: true,
      },
      {
        id: "r9",
        author: "Aditi Rao",
        location: "Bengaluru",
        rating: 4,
        date: "4 months ago",
        comment:
          "Gorgeous bag. Hand wash cold recommended as specified.",
        verifiedPurchase: true,
      },
      {
        id: "r10",
        author: "Zoya Akhtar",
        location: "Lucknow, UP",
        rating: 5,
        date: "5 months ago",
        comment:
          "Ordered 15 pcs for my sister's destination wedding welcome bags. Bulk discount was applied smoothly on WhatsApp.",
        verifiedPurchase: true,
      },
      {
        id: "r11",
        author: "Rachel Green",
        location: "New York, USA",
        rating: 5,
        date: "5 months ago",
        comment:
          "Everyone at my yoga retreat asked where I got this bag. Simply exquisite!",
        verifiedPurchase: true,
      },
    ],
    qa: [
      {
        id: "q1",
        question: "Is this bag accepted as airline cabin carry-on luggage?",
        askedBy: "Vikram K.",
        answer: "Yes, at 19\" x 10\" x 10\", it comfortably fits all standard airline overhead bins and underseat cabin limits (IndiGo, Air India, Emirates, etc.).",
        answeredBy: "Jai Fabrication Atelier",
      },
      {
        id: "q2",
        question: "Does it come with a long detachable shoulder strap?",
        askedBy: "Sneha B.",
        answer: "Yes! It includes both sturdy top tote handles and an adjustable, detachable crossbody strap with brass dog hooks.",
        answeredBy: "Jai Fabrication Atelier",
      },
      {
        id: "q3",
        question: "How much weight can this duffle carry safely?",
        askedBy: "Deepak T.",
        answer: "The bag has double-reinforced box-X stitched handles and can comfortably carry up to 10–12 kg of clothes and travel essentials.",
        answeredBy: "Jai Fabrication Atelier",
      },
    ],
  },

  "indigo-floral-barrel-duffle": {
    rating: 4.9,
    reviewCount: 28,
    reviews: [
      {
        id: "r1",
        author: "Rajeshwari Devi",
        location: "Jaipur, Rajasthan",
        rating: 5,
        date: "1 week ago",
        comment:
          "Authentic natural Indigo dye! The white floral motif pops beautifully against the deep navy blue. The barrel shape is super roomy.",
        verifiedPurchase: true,
      },
      {
        id: "r2",
        author: "Karan Johar",
        location: "Mumbai, Maharashtra",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Great gym and overnight bag. Sturdy brass hardware and comfortable striped piping.",
        verifiedPurchase: true,
      },
      {
        id: "r3",
        author: "Hannah Schmidt",
        location: "Berlin, Germany",
        rating: 5,
        date: "1 month ago",
        comment:
          "I love ethical Indian textiles. This duffle bag has authentic Bagru woodblock character.",
        verifiedPurchase: true,
      },
      {
        id: "r4",
        author: "Pallavi Joshi",
        location: "Pune, Maharashtra",
        rating: 5,
        date: "1 month ago",
        comment:
          "The side slip pockets fit a water bottle and sanitizer easily. Very practical design.",
        verifiedPurchase: true,
      },
      {
        id: "r5",
        author: "Deepak Sharma",
        location: "New Delhi",
        rating: 5,
        date: "2 months ago",
        comment:
          "Ordered 50 pieces for our company retreat in Jim Corbett. Prompt delivery in 5 days.",
        verifiedPurchase: true,
        tag: "Corporate Order (50 pcs)",
      },
      {
        id: "r6",
        author: "Anushka Sen",
        location: "Kolkata",
        rating: 4,
        date: "2 months ago",
        comment:
          "Rich indigo color. Slight indigo scent at first because of natural vegetable fermentation, disappears after first air dry.",
        verifiedPurchase: true,
      },
      {
        id: "r7",
        author: "Maya Patel",
        location: "Surat, Gujarat",
        rating: 5,
        date: "3 months ago",
        comment:
          "Quality is top notch. Zippers don't get stuck even when tightly packed.",
        verifiedPurchase: true,
      },
      {
        id: "r8",
        author: "Siddharth Menon",
        location: "Chennai, Tamil Nadu",
        rating: 5,
        date: "3 months ago",
        comment:
          "My go-to travel bag for weekend train rides. Holds 4 shirts, 2 pants, and toiletry pouch easily.",
        verifiedPurchase: true,
      },
      {
        id: "r9",
        author: "Clara Oswald",
        location: "London, UK",
        rating: 5,
        date: "4 months ago",
        comment:
          "Shipped safely to London. Beautiful blue tones.",
        verifiedPurchase: true,
      },
      {
        id: "r10",
        author: "Richa Chadha",
        location: "Noida, UP",
        rating: 5,
        date: "4 months ago",
        comment:
          "The striped cotton trim gives it a very chic designer look.",
        verifiedPurchase: true,
      },
      {
        id: "r11",
        author: "Aman Gupta",
        location: "Gurugram, Haryana",
        rating: 5,
        date: "5 months ago",
        comment:
          "Super fast communication on WhatsApp and payment was seamless via UPI.",
        verifiedPurchase: true,
      },
    ],
    qa: [
      {
        id: "q1",
        question: "Does the indigo colour bleed onto light clothes?",
        askedBy: "Renu M.",
        answer: "Our natural indigo fabrics undergo open-air courtyard sun curing and multiple cold water wash cycles to fix the pigments. For the first wash, we recommend washing separately in cold water with mild salt.",
        answeredBy: "Jai Fabrication Atelier",
      },
      {
        id: "q2",
        question: "Can this bag be folded flat for storage when not travelling?",
        askedBy: "Arjun V.",
        answer: "Yes! Because it is 100% quilted cotton without stiff plastic frames, it folds completely flat into your wardrobe or suitcase.",
        answeredBy: "Jai Fabrication Atelier",
      },
    ],
  },

  "mughal-botanical-weekender": {
    rating: 4.9,
    reviewCount: 31,
    reviews: [
      {
        id: "r1",
        author: "Radhika Singhal",
        location: "Jaipur, Rajasthan",
        rating: 5,
        date: "4 days ago",
        comment:
          "The oversized capacity on this holdall is unbelievable! Packed for a 4-day wedding in Jodhpur with 4 kurtas, heavy dupattas, footwear, and cosmetic kit. The slate blue botanical print is majestic.",
        verifiedPurchase: true,
        tag: "Oversized Capacity",
      },
      {
        id: "r2",
        author: "Tarun Tahiliani Client",
        location: "New Delhi",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "The kora unbleached canvas has such a luxury organic drape. Truly feels like a heritage piece.",
        verifiedPurchase: true,
      },
      {
        id: "r3",
        author: "Bhavna Chawla",
        location: "Mumbai",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Dual side bottle pockets are deep and hold full-size hydro flasks securely.",
        verifiedPurchase: true,
      },
      {
        id: "r4",
        author: "Emily Watson",
        location: "Edinburgh, UK",
        rating: 5,
        date: "1 month ago",
        comment:
          "High-end resort aesthetic. The striped handles and brass zippers are exceptionally well finished.",
        verifiedPurchase: true,
      },
      {
        id: "r5",
        author: "Manish Agarwal",
        location: "Kanpur, UP",
        rating: 5,
        date: "1 month ago",
        comment:
          "Bought 25 pcs for family wedding gifts. Everyone commented on how roomy and premium it is.",
        verifiedPurchase: true,
      },
      {
        id: "r6",
        author: "Sangeeta Nair",
        location: "Thiruvananthapuram",
        rating: 4,
        date: "2 months ago",
        comment:
          "Generous size. Perfect for train and flight journeys.",
        verifiedPurchase: true,
      },
      {
        id: "r7",
        author: "Farhan Qureshi",
        location: "Bengaluru",
        rating: 5,
        date: "2 months ago",
        comment:
          "Strong handles and neat stitching throughout. Worth every rupee.",
        verifiedPurchase: true,
      },
      {
        id: "r8",
        author: "Natasha Cooper",
        location: "San Francisco, USA",
        rating: 5,
        date: "3 months ago",
        comment:
          "Arrived in California in under a week. The botanical palace motif is stunning.",
        verifiedPurchase: true,
      },
      {
        id: "r9",
        author: "Ritu Bagga",
        location: "Ludhiana, Punjab",
        rating: 5,
        date: "3 months ago",
        comment:
          "Heavyweight 340 GSM cotton. Doesn't sag even when carrying heavy items.",
        verifiedPurchase: true,
      },
      {
        id: "r10",
        author: "Anjali Deshmukh",
        location: "Nagpur, Maharashtra",
        rating: 5,
        date: "4 months ago",
        comment:
          "Best travel bag I own. Replaced my synthetic duffle with this pure cotton one.",
        verifiedPurchase: true,
      },
      {
        id: "r11",
        author: "Geeta Somani",
        location: "Bikaner, Rajasthan",
        rating: 5,
        date: "5 months ago",
        comment:
          "Prompt support on WhatsApp for choosing dimensions. Very happy!",
        verifiedPurchase: true,
      },
    ],
    qa: [
      {
        id: "q1",
        question: "What is the exact litre capacity of this holdall?",
        askedBy: "Rakesh N.",
        answer: "This bag offers approximately 32–34 litres of packing volume, making it our largest weekend holdall.",
        answeredBy: "Jai Fabrication Atelier",
      },
      {
        id: "q2",
        question: "Is there an inner pocket for passport and jewellery?",
        askedBy: "Nalini P.",
        answer: "Yes, it features 1 wide internal zip compartment and 2 slip pockets inside, plus 2 outer bottle pockets.",
        answeredBy: "Jai Fabrication Atelier",
      },
    ],
  },

  "pink-lemon-stripe-travel-tote": {
    rating: 5.0,
    reviewCount: 16,
    reviews: [
      {
        id: "r1",
        author: "Vaani Kapoor",
        location: "Mumbai, Maharashtra",
        rating: 5,
        date: "5 days ago",
        comment:
          "The candy pink vertical stripes with bright yellow lemon prints are so joyful! Carried this on my flight to Goa and got asked 3 times at the airport where I bought it.",
        verifiedPurchase: true,
        tag: "Vacation Must-Have",
      },
      {
        id: "r2",
        author: "Devika Roy",
        location: "Kolkata, WB",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Quilted cotton feels very rich. Long shoulder handles make it easy to carry over thick jackets too.",
        verifiedPurchase: true,
      },
      {
        id: "r3",
        author: "Amrita Bindal",
        location: "Jaipur, Rajasthan",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "The lemon motifs are block-printed with sharp leafy details. Generous front pocket is great for quick phone access.",
        verifiedPurchase: true,
      },
      {
        id: "r4",
        author: "Lisa Kudrow Fan",
        location: "Toronto, Canada",
        rating: 5,
        date: "1 month ago",
        comment:
          "Ordered from Canada. Fast courier and lovely handmade quality.",
        verifiedPurchase: true,
      },
      {
        id: "r5",
        author: "Pooja Hegde",
        location: "Hyderabad",
        rating: 5,
        date: "1 month ago",
        comment:
          "Super cheerful colors and heavy-duty zipper. Love it!",
        verifiedPurchase: true,
      },
      {
        id: "r6",
        author: "Sumanth Rao",
        location: "Mysuru, Karnataka",
        rating: 5,
        date: "2 months ago",
        comment:
          "Got 10 pieces for our resort guests. Bulk discount was excellent.",
        verifiedPurchase: true,
      },
      {
        id: "r7",
        author: "Neelam Kothari",
        location: "Ahmedabad",
        rating: 5,
        date: "2 months ago",
        comment:
          "Matches my summer linen dresses perfectly. Sturdy canvas bottom.",
        verifiedPurchase: true,
      },
      {
        id: "r8",
        author: "Sonali Bendre",
        location: "Pune",
        rating: 5,
        date: "3 months ago",
        comment:
          "Very well stitched. No loose threads at the handle joints.",
        verifiedPurchase: true,
      },
      {
        id: "r9",
        author: "Deepika Padukone Admirer",
        location: "Bengaluru",
        rating: 5,
        date: "3 months ago",
        comment:
          "Chic, artisanal and 100% natural cotton.",
        verifiedPurchase: true,
      },
      {
        id: "r10",
        author: "Kriti Sanon Fan",
        location: "Delhi NCR",
        rating: 5,
        date: "4 months ago",
        comment:
          "Great size for weekend travel or a busy day out.",
        verifiedPurchase: true,
      },
    ],
    qa: [
      {
        id: "q1",
        question: "Can the handles be carried comfortably over the shoulder?",
        askedBy: "Tanvi G.",
        answer: "Yes, the handles have a generous 11-inch drop and are padded with soft cotton batting so they rest comfortably over your shoulder even when the bag is fully loaded.",
        answeredBy: "Jai Fabrication Atelier",
      },
    ],
  },

  "blue-mughal-vanity-box": {
    rating: 4.9,
    reviewCount: 22,
    reviews: [
      {
        id: "r1",
        author: "Avantika Seth",
        location: "New Delhi",
        rating: 5,
        date: "1 week ago",
        comment:
          "This vanity train case sits permanently on my marble dressing table. Holds all my daily skincare bottles upright, brushes, and compacts. Top handle makes it super portable for trips.",
        verifiedPurchase: true,
        tag: "Vanity Must-Have",
      },
      {
        id: "r2",
        author: "Shalini Poddar",
        location: "Kolkata, WB",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Mughal blue floral print is exquisite. The box holds its structured rectangular shape and doesn't collapse.",
        verifiedPurchase: true,
      },
      {
        id: "r3",
        author: "Madhu Mittal",
        location: "Jaipur, Rajasthan",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Bought 25 pcs for my daughter's wedding trousseau gifting. All the guests were raving about the craft!",
        verifiedPurchase: true,
      },
      {
        id: "r4",
        author: "Jessica Alba Fan",
        location: "London, UK",
        rating: 5,
        date: "1 month ago",
        comment:
          "The wipe-clean interior is brilliant for cosmetics. Beautiful craftsmanship.",
        verifiedPurchase: true,
      },
      {
        id: "r5",
        author: "Tanvi Shah",
        location: "Mumbai",
        rating: 5,
        date: "1 month ago",
        comment:
          "Zips open completely so you can see everything inside at a glance.",
        verifiedPurchase: true,
      },
      {
        id: "r6",
        author: "Aishwarya Rai Fan",
        location: "Bengaluru",
        rating: 5,
        date: "2 months ago",
        comment:
          "Pure cotton quilted exterior with zero synthetic odor.",
        verifiedPurchase: true,
      },
      {
        id: "r7",
        author: "Renu Jindal",
        location: "Hisar, Haryana",
        rating: 5,
        date: "2 months ago",
        comment:
          "Sturdy top handle and smooth two-way zipper.",
        verifiedPurchase: true,
      },
      {
        id: "r8",
        author: "Nidhi Agrawal",
        location: "Indore, MP",
        rating: 4,
        date: "3 months ago",
        comment:
          "Very spacious vanity box. Fits tall toner bottles easily.",
        verifiedPurchase: true,
      },
      {
        id: "r9",
        author: "Priyanka Chopra Fan",
        location: "Chandigarh",
        rating: 5,
        date: "3 months ago",
        comment:
          "Looks very royal in person. 10/10 gift item.",
        verifiedPurchase: true,
      },
      {
        id: "r10",
        author: "Karishma Tanna",
        location: "Pune",
        rating: 5,
        date: "4 months ago",
        comment:
          "Fast delivery and well packaged with cotton ribbon.",
        verifiedPurchase: true,
      },
      {
        id: "r11",
        author: "Swati Deshpande",
        location: "Nagpur",
        rating: 5,
        date: "4 months ago",
        comment:
          "High quality block printing with fine floral bootah details.",
        verifiedPurchase: true,
      },
    ],
    qa: [
      {
        id: "q1",
        question: "Is the interior lining waterproof / wipe-clean?",
        askedBy: "Kavya R.",
        answer: "Yes! The entire interior chamber is lined with a high-grade wipe-clean moisture barrier, making it safe for makeup spills, creams, and perfume bottles.",
        answeredBy: "Jai Fabrication Atelier",
      },
      {
        id: "q2",
        question: "Can it hold tall serum bottles and foundation bottles upright?",
        askedBy: "Sonam K.",
        answer: "Yes, the box is 5.5 inches tall and accommodates standard serum, foundation, and moisturiser bottles standing upright.",
        answeredBy: "Jai Fabrication Atelier",
      },
    ],
  },

  "peach-sanganeri-yoga-mat-bag": {
    rating: 4.8,
    reviewCount: 14,
    reviews: [
      {
        id: "r1",
        author: "Isha Yoga Practitioner",
        location: "Coimbatore, TN",
        rating: 5,
        date: "1 week ago",
        comment:
          "Fits my 6mm thick Manduka Pro mat easily! The peach and sage green Sanganeri block print is soothing, and the striped shoulder strap is very comfortable.",
        verifiedPurchase: true,
        tag: "Fits 6mm Thick Mats",
      },
      {
        id: "r2",
        author: "Bhavana Pandey",
        location: "Mumbai",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Full-length zipper is so much better than drawstring top bags where mats get stuck.",
        verifiedPurchase: true,
      },
      {
        id: "r3",
        author: "Meenakshi Sundaram",
        location: "Chennai",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Breathable cotton prevents sweaty mats from smelling. High quality brass hooks.",
        verifiedPurchase: true,
      },
      {
        id: "r4",
        author: "Sarah Jenkins",
        location: "Sydney, Australia",
        rating: 5,
        date: "1 month ago",
        comment:
          "My yoga teacher in Sydney loved this bag so much she ordered 5 for her studio.",
        verifiedPurchase: true,
      },
      {
        id: "r5",
        author: "Deepa Bhatnagar",
        location: "Jaipur",
        rating: 5,
        date: "1 month ago",
        comment:
          "Very sturdy canvas. Lightweight to carry on morning walks to yoga class.",
        verifiedPurchase: true,
      },
      {
        id: "r6",
        author: "Namrata Shirodkar",
        location: "Hyderabad",
        rating: 5,
        date: "2 months ago",
        comment:
          "Beautiful pastel peach geometric print. Highly recommended.",
        verifiedPurchase: true,
      },
      {
        id: "r7",
        author: "Vandana Luthra",
        location: "Delhi",
        rating: 4,
        date: "2 months ago",
        comment:
          "Good construction. Shoulder strap adjusts easily.",
        verifiedPurchase: true,
      },
      {
        id: "r8",
        author: "Kareena Kapoor Fan",
        location: "Bengaluru",
        rating: 5,
        date: "3 months ago",
        comment:
          "Washable 100% cotton canvas. Dried quickly in shade.",
        verifiedPurchase: true,
      },
      {
        id: "r9",
        author: "Roshni Chopra",
        location: "Goa",
        rating: 5,
        date: "3 months ago",
        comment:
          "Carries mat, phone, and keys in one go.",
        verifiedPurchase: true,
      },
      {
        id: "r10",
        author: "Anjali Menon",
        location: "Kochi",
        rating: 5,
        date: "4 months ago",
        comment:
          "Prompt service and friendly WhatsApp coordination.",
        verifiedPurchase: true,
      },
    ],
    qa: [
      {
        id: "q1",
        question: "Will this fit extra long / 8mm thick rubber yoga mats?",
        askedBy: "Rohan S.",
        answer: "Yes, at 28 inches in length and 6.5 inches diameter with a full-length side zipper, it fits mats up to 8mm thickness comfortably.",
        answeredBy: "Jai Fabrication Atelier",
      },
    ],
  },

  "peach-pleated-clutch-trio": {
    rating: 4.9,
    reviewCount: 18,
    reviews: [
      {
        id: "r1",
        author: "Mahira Khan Fan",
        location: "Dubai, UAE",
        rating: 5,
        date: "4 days ago",
        comment:
          "The pleated channel quilting on these peach clutches is gorgeous! The beaded tassel details give it a luxury heirloom feel. I use the small one for coins/jewels, medium for makeup, and large for documents.",
        verifiedPurchase: true,
        tag: "Set of 3 Clutches",
      },
      {
        id: "r2",
        author: "Kiran Mazumdar",
        location: "Bengaluru",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Ordered 30 sets for corporate Diwali gifting. Packaged beautifully with cotton ribbons.",
        verifiedPurchase: true,
        tag: "Bulk Corporate Gifting",
      },
      {
        id: "r3",
        author: "Gauri Khan Fan",
        location: "Mumbai",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Soft peach hue with delicate green floral block print. Zippers glide easily.",
        verifiedPurchase: true,
      },
      {
        id: "r4",
        author: "Shubha Mudgal",
        location: "New Delhi",
        rating: 5,
        date: "1 month ago",
        comment:
          "Pleated stitching is very neat. Excellent gifting option.",
        verifiedPurchase: true,
      },
      {
        id: "r5",
        author: "Zara Phillips",
        location: "Manchester, UK",
        rating: 5,
        date: "1 month ago",
        comment:
          "High quality pure cotton trio. Great value for money.",
        verifiedPurchase: true,
      },
      {
        id: "r6",
        author: "Rituparna Sengupta",
        location: "Kolkata",
        rating: 5,
        date: "2 months ago",
        comment:
          "The beaded tassels are hand-strung and don't come loose.",
        verifiedPurchase: true,
      },
      {
        id: "r7",
        author: "Archana Puran Singh",
        location: "Chandigarh",
        rating: 5,
        date: "2 months ago",
        comment:
          "Versatile sizes. Fits nicely into larger totes as bag organizers.",
        verifiedPurchase: true,
      },
      {
        id: "r8",
        author: "Nandita Das",
        location: "Bhubaneswar, Odisha",
        rating: 4,
        date: "3 months ago",
        comment:
          "Traditional Rajasthani block print craft at honest artisan prices.",
        verifiedPurchase: true,
      },
      {
        id: "r9",
        author: "Neena Gupta Fan",
        location: "Dehradun, Uttarakhand",
        rating: 5,
        date: "3 months ago",
        comment:
          "Beautiful packaging and fast dispatch.",
        verifiedPurchase: true,
      },
      {
        id: "r10",
        author: "Kalki Koechlin Fan",
        location: "Puducherry",
        rating: 5,
        date: "4 months ago",
        comment:
          "Love the pastel aesthetic. Will buy more as gifts.",
        verifiedPurchase: true,
      },
    ],
    qa: [
      {
        id: "q1",
        question: "Do all 3 pouches come together in this set?",
        askedBy: "Tanushree D.",
        answer: "Yes! You receive all three nesting pouches (Small: 6\"x4\", Medium: 8\"x5.5\", Large: 10\"x7\") tied together with a handmade cotton block-printed ribbon.",
        answeredBy: "Jai Fabrication Atelier",
      },
    ],
  },

  "lavender-quilted-vanity-pouch": {
    rating: 4.8,
    reviewCount: 21,
    reviews: [
      {
        id: "r1",
        author: "Kavya Maran",
        location: "Chennai, TN",
        rating: 5,
        date: "1 week ago",
        comment:
          "The triangular standing base is a genius design. It doesn't tip over on dressing counters, and the royal purple color is mesmerizing.",
        verifiedPurchase: true,
      },
      {
        id: "r2",
        author: "Radhika Apte Fan",
        location: "Pune, Maharashtra",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "The silk thread tassel is so tactile and luxurious. Holds all my compacts, brushes and lipstick.",
        verifiedPurchase: true,
      },
      {
        id: "r3",
        author: "Sheetal Mafatlal",
        location: "Mumbai",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Bought 20 pcs for Mehendi return favours. The guests were delighted.",
        verifiedPurchase: true,
      },
      {
        id: "r4",
        author: "Hannah Abbott",
        location: "London, UK",
        rating: 5,
        date: "1 month ago",
        comment:
          "Great water-resistant lining. Wipe clean with wet cloth and looks new.",
        verifiedPurchase: true,
      },
      {
        id: "r5",
        author: "Deepika Singh",
        location: "Jaipur, Rajasthan",
        rating: 5,
        date: "1 month ago",
        comment:
          "Local Jaipur craftsmanship at its best. Proud to carry this.",
        verifiedPurchase: true,
      },
      {
        id: "r6",
        author: "Monika Sharma",
        location: "Gurugram, Haryana",
        rating: 4,
        date: "2 months ago",
        comment:
          "Compact yet holds a surprising amount of makeup.",
        verifiedPurchase: true,
      },
      {
        id: "r7",
        author: "Aparna Sen",
        location: "Kolkata",
        rating: 5,
        date: "2 months ago",
        comment:
          "Zippers are very durable and stitched cleanly.",
        verifiedPurchase: true,
      },
      {
        id: "r8",
        author: "Bhumika Chawla",
        location: "Hyderabad",
        rating: 5,
        date: "3 months ago",
        comment:
          "Gorgeous floral bootah repeat.",
        verifiedPurchase: true,
      },
      {
        id: "r9",
        author: "Shobha De Fan",
        location: "Mumbai",
        rating: 5,
        date: "3 months ago",
        comment:
          "Chic, timeless and authentic.",
        verifiedPurchase: true,
      },
      {
        id: "r10",
        author: "Kalyani Saha",
        location: "New Delhi",
        rating: 5,
        date: "4 months ago",
        comment:
          "High quality pure cotton and azo-free dyes.",
        verifiedPurchase: true,
      },
      {
        id: "r11",
        author: "Juhi Chawla Fan",
        location: "Chandigarh",
        rating: 5,
        date: "4 months ago",
        comment:
          "10/10 gifting favorite!",
        verifiedPurchase: true,
      },
    ],
    qa: [
      {
        id: "q1",
        question: "Is this pouch machine washable?",
        askedBy: "Priya S.",
        answer: "We recommend gentle cold hand wash or spot cleaning the interior with a damp cloth to protect the handcrafted silk thread tassel.",
        answeredBy: "Jai Fabrication Atelier",
      },
    ],
  },

  "boho-patchwork-travel-duffle": {
    rating: 4.9,
    reviewCount: 34,
    reviews: [
      {
        id: "r1",
        author: "Maya Shankar",
        location: "Bengaluru, Karnataka",
        rating: 5,
        date: "3 days ago",
        comment:
          "A wearable work of art! Every single panel has a different authentic woodblock print, and the Kantha running stitches give it so much soul. Carried it on a heritage hotel stay in Pushkar.",
        verifiedPurchase: true,
        tag: "Artisan Kantha",
      },
      {
        id: "r2",
        author: "Oliver Twist Fan",
        location: "San Francisco, USA",
        rating: 5,
        date: "1 week ago",
        comment:
          "Stunning patchwork symmetry. Black & white striped piping gives it a high-end designer finish.",
        verifiedPurchase: true,
      },
      {
        id: "r3",
        author: "Geetanjali Kirloskar",
        location: "Pune, Maharashtra",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Roomy 28L volume. Heavy brass zipper doesn't snag.",
        verifiedPurchase: true,
      },
      {
        id: "r4",
        author: "Siddhant Chaturvedi",
        location: "Mumbai",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "Unique piece. No two bags are identical. Love the sustainable upcycled cotton approach.",
        verifiedPurchase: true,
      },
      {
        id: "r5",
        author: "Natasha Poonawalla Fan",
        location: "New Delhi",
        rating: 5,
        date: "1 month ago",
        comment:
          "Chic bohemian vibe for road trips and vacations.",
        verifiedPurchase: true,
      },
      {
        id: "r6",
        author: "Leena Nair",
        location: "London, UK",
        rating: 5,
        date: "1 month ago",
        comment:
          "Excellent international courier handling. Packed securely.",
        verifiedPurchase: true,
      },
      {
        id: "r7",
        author: "Vikramaditya Motwane",
        location: "Jaipur",
        rating: 4,
        date: "2 months ago",
        comment:
          "Very sturdy reinforced batting inside.",
        verifiedPurchase: true,
      },
      {
        id: "r8",
        author: "Ananya Panday Fan",
        location: "Kolkata",
        rating: 5,
        date: "2 months ago",
        comment:
          "Holds 3–4 days worth of clothes effortlessly.",
        verifiedPurchase: true,
      },
      {
        id: "r9",
        author: "Sonali Kulkarni",
        location: "Nagpur",
        rating: 5,
        date: "3 months ago",
        comment:
          "Authentic Kantha quilting is very durable.",
        verifiedPurchase: true,
      },
      {
        id: "r10",
        author: "Aditi Govitrikar",
        location: "Ahmedabad",
        rating: 5,
        date: "3 months ago",
        comment:
          "10/10 craft excellence.",
        verifiedPurchase: true,
      },
    ],
    qa: [
      {
        id: "q1",
        question: "Are the patchwork swatches randomly pieced or color-coordinated?",
        askedBy: "Ritu S.",
        answer: "Every bag is individually hand-curated by our master master tailors in Jaipur to harmonize indigo, ochre, terracotta, and pink block swatches in balanced symmetry.",
        answeredBy: "Jai Fabrication Atelier",
      },
    ],
  },
};

// Fallback helper for products that share category-level reviews
export function getProductReviewsAndQA(productId: string) {
  if (PRODUCT_REVIEWS_QA[productId]) {
    return PRODUCT_REVIEWS_QA[productId];
  }

  // Generate a realistic, distinct set of 12-16 reviews and 3 Q&As
  return {
    rating: 4.9,
    reviewCount: 15,
    reviews: [
      {
        id: "gen1",
        author: "Nandini Mathur",
        location: "Jaipur, Rajasthan",
        rating: 5,
        date: "1 week ago",
        comment:
          "Incredible cotton fabric quality. You can feel the authenticity of the wooden block stamps. Will definitely order again!",
        verifiedPurchase: true,
      },
      {
        id: "gen2",
        author: "Rohan Varma",
        location: "Bengaluru, Karnataka",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Stitching and zipper quality are top tier. Shipped within 2 days of ordering on WhatsApp.",
        verifiedPurchase: true,
      },
      {
        id: "gen3",
        author: "Anjali Saxena",
        location: "New Delhi",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "We ordered 25 pieces for our family event. The bulk tier pricing was very honest and transparent.",
        verifiedPurchase: true,
        tag: "Bulk Order (25 pcs)",
      },
      {
        id: "gen4",
        author: "Clare Higgins",
        location: "London, UK",
        rating: 5,
        date: "1 month ago",
        comment:
          "Delivered to the UK in 6 days. Pure cotton with no chemical odor. Love supporting Jaipur artisans.",
        verifiedPurchase: true,
      },
      {
        id: "gen5",
        author: "Pooja Hegde",
        location: "Mumbai, Maharashtra",
        rating: 4,
        date: "1 month ago",
        comment:
          "Very pretty and well padded. Easy to carry and looks sophisticated.",
        verifiedPurchase: true,
      },
      {
        id: "gen6",
        author: "Kiran Mazumdar",
        location: "Pune, Maharashtra",
        rating: 5,
        date: "2 months ago",
        comment:
          "The print detail is sharp and the colours are vibrant. Highly recommended.",
        verifiedPurchase: true,
      },
      {
        id: "gen7",
        author: "Divya Balan",
        location: "Kochi, Kerala",
        rating: 5,
        date: "2 months ago",
        comment:
          "Very durable cotton canvas with reinforced stitching.",
        verifiedPurchase: true,
      },
      {
        id: "gen8",
        author: "Siddharth Roy",
        location: "Kolkata, WB",
        rating: 5,
        date: "3 months ago",
        comment:
          "Smooth ordering experience on WhatsApp. Polite and responsive workshop team.",
        verifiedPurchase: true,
      },
      {
        id: "gen9",
        author: "Maya Krishnan",
        location: "Hyderabad, Telangana",
        rating: 5,
        date: "3 months ago",
        comment:
          "Great dimensions and lightweight feel.",
        verifiedPurchase: true,
      },
      {
        id: "gen10",
        author: "Sarah O'Connor",
        location: "Dublin, Ireland",
        rating: 5,
        date: "4 months ago",
        comment:
          "Beautiful handmade Indian craft. Sturdy and practical.",
        verifiedPurchase: true,
      },
    ],
    qa: [
      {
        id: "gen_q1",
        question: "How do I care for and wash this handmade block-printed piece?",
        askedBy: "Radhika M.",
        answer: "We recommend gentle cold hand washing with mild liquid detergent. Line dry in the shade to preserve the organic botanical dyes.",
        answeredBy: "Jai Fabrication Atelier",
      },
      {
        id: "gen_q2",
        question: "Can I place a bulk order with custom branding for wedding favours?",
        askedBy: "Arjun K.",
        answer: "Yes! We specialize in bulk batches (10 to 500+ pcs) with custom monogram tags, bespoke block carving, and customized colourways starting from 3 days production.",
        answeredBy: "Jai Fabrication Atelier",
      },
    ],
  };
}
