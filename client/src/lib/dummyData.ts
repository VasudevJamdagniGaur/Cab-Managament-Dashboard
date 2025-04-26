export const branchOptions = [
  { value: "all", label: "All Branches" },
  { value: "Delhi", label: "Delhi" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Bangalore", label: "Bangalore" },
  { value: "Hyderabad", label: "Hyderabad" }
];

export const dashboardStats = {
  all: {
    totalRidesToday: 238,
    liveTrips: 42,
    monthlyCost: 386420,
    avgRating: 4.7
  },
  Delhi: {
    totalRidesToday: 98,
    liveTrips: 18,
    monthlyCost: 156840,
    avgRating: 4.5
  },
  Mumbai: {
    totalRidesToday: 72,
    liveTrips: 13,
    monthlyCost: 123500,
    avgRating: 4.8
  },
  Bangalore: {
    totalRidesToday: 52,
    liveTrips: 8,
    monthlyCost: 78250,
    avgRating: 4.6
  },
  Hyderabad: {
    totalRidesToday: 16,
    liveTrips: 3,
    monthlyCost: 27830,
    avgRating: 4.9
  }
};

export const recentReviews = [
  {
    id: 1,
    user: {
      id: 2,
      fullName: "Priya Sharma",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    rating: 5,
    comment: "Great service! Driver was on time and very professional. The cab was clean and comfortable.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 2,
    user: {
      id: 3,
      fullName: "Rajiv Kumar",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    rating: 4,
    comment: "Driver arrived a bit late, but the ride was good. The cab was nice and I reached my destination on time.",
    createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000) // 1 day and 1 hour ago
  },
  {
    id: 3,
    user: {
      id: 4,
      fullName: "Neha Gupta",
      profileImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
    },
    rating: 4.5,
    comment: "Excellent experience! The driver was courteous and the cab was clean. Would highly recommend.",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000) // 2 days ago
  }
];

export const scheduledRides = [
  // Today's rides
  {
    id: 1,
    startTime: new Date(new Date().setHours(9, 30, 0, 0)),
    user: {
      id: 2,
      fullName: "Narendra Modi",
      department: "Sales",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    startLocation: "Dwarka",
    endLocation: "Cyber City, Gurugram",
    cab: {
      id: 1,
      number: "DL 01 AB 1234",
      model: "Toyota Innova",
      color: "White"
    },
    status: "Confirmed"
  },
  {
    id: 2,
    startTime: new Date(new Date().setHours(10, 15, 0, 0)),
    user: {
      id: 3,
      fullName: "Rahul Gandhi",
      department: "Marketing",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    startLocation: "Andheri",
    endLocation: "Bandra Kurla Complex, Mumbai",
    cab: {
      id: 2,
      number: "MH 02 XY 5678",
      model: "Maruti Swift Dzire",
      color: "Silver"
    },
    status: "Pending"
  },
  {
    id: 3,
    startTime: new Date(new Date().setHours(11, 45, 0, 0)),
    user: {
      id: 4,
      fullName: "Smriti Irani",
      department: "HR",
      profileImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
    },
    startLocation: "Whitefield",
    endLocation: "Electronic City, Bangalore",
    cab: {
      id: 3,
      number: "KA 03 CD 9012",
      model: "Honda City",
      color: "Black"
    },
    status: "In Process"
  },
  
  // Yesterday's rides
  {
    id: 4,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(8, 15, 0, 0)),
    user: {
      id: 5,
      fullName: "Amit Shah",
      department: "Finance",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    startLocation: "Indirapuram",
    endLocation: "Noida Sector 62",
    cab: {
      id: 4,
      number: "DL 01 CD 5678",
      model: "Honda Amaze",
      color: "Silver"
    },
    status: "Completed"
  },
  {
    id: 5,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(9, 45, 0, 0)),
    user: {
      id: 6,
      fullName: "Arvind Kejriwal",
      department: "Engineering",
      profileImage: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1"
    },
    startLocation: "Vasant Kunj",
    endLocation: "Connaught Place, Delhi",
    cab: {
      id: 5,
      number: "DL 02 EF 9012",
      model: "Toyota Corolla",
      color: "Black"
    },
    status: "Completed"
  },
  
  // This week's rides (2-6 days ago)
  {
    id: 6,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 2)).setHours(10, 30, 0, 0)),
    user: {
      id: 7,
      fullName: "Mamata Banerjee",
      department: "Engineering",
      profileImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604"
    },
    startLocation: "Salt Lake",
    endLocation: "Sector 5, Kolkata",
    cab: {
      id: 6,
      number: "WB 01 GH 3456",
      model: "Maruti Suzuki Ciaz",
      color: "White"
    },
    status: "Completed"
  },
  {
    id: 7,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 3)).setHours(11, 15, 0, 0)),
    user: {
      id: 8,
      fullName: "Yogi Adityanath",
      department: "Engineering",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    startLocation: "Hazratganj",
    endLocation: "Gomti Nagar, Lucknow",
    cab: {
      id: 7,
      number: "UP 32 IJ 7890",
      model: "Hyundai Verna",
      color: "Red"
    },
    status: "Cancelled"
  },
  {
    id: 8,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 4)).setHours(9, 0, 0, 0)),
    user: {
      id: 9,
      fullName: "Nitin Gadkari",
      department: "Infrastructure",
      profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    startLocation: "Civil Lines",
    endLocation: "Ramdaspeth, Nagpur",
    cab: {
      id: 8,
      number: "MH 31 KL 1234",
      model: "Maruti Swift",
      color: "Blue"
    },
    status: "Completed"
  },
  {
    id: 9,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 5)).setHours(14, 30, 0, 0)),
    user: {
      id: 10,
      fullName: "Sonia Gandhi",
      department: "Administration",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    startLocation: "Lutyens Delhi",
    endLocation: "Parliament House, Delhi",
    cab: {
      id: 9,
      number: "DL 03 MN 5678",
      model: "Toyota Fortuner",
      color: "White"
    },
    status: "Completed"
  },
  
  // Last week rides (7-13 days ago)
  {
    id: 10,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 7)).setHours(10, 0, 0, 0)),
    user: {
      id: 11,
      fullName: "Piyush Goyal",
      department: "Finance",
      profileImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857"
    },
    startLocation: "Worli",
    endLocation: "Nariman Point, Mumbai",
    cab: {
      id: 10,
      number: "MH 01 OP 9012",
      model: "Honda City",
      color: "Silver"
    },
    status: "Completed"
  },
  {
    id: 11,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 10)).setHours(8, 45, 0, 0)),
    user: {
      id: 12,
      fullName: "Nirmala Sitharaman",
      department: "Finance",
      profileImage: "https://images.unsplash.com/photo-1599842057874-37393e9342df"
    },
    startLocation: "R.K. Puram",
    endLocation: "North Block, Delhi",
    cab: {
      id: 11,
      number: "DL 04 QR 3456",
      model: "Toyota Camry",
      color: "Black"
    },
    status: "Completed"
  },
  
  // This month (14-30 days ago)
  {
    id: 12,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 15)).setHours(9, 30, 0, 0)),
    user: {
      id: 13,
      fullName: "S. Jaishankar",
      department: "External Affairs",
      profileImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5"
    },
    startLocation: "Chanakyapuri",
    endLocation: "South Block, Delhi",
    cab: {
      id: 12,
      number: "DL 05 ST 7890",
      model: "BMW 5 Series",
      color: "Blue"
    },
    status: "Completed"
  },
  {
    id: 13,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 20)).setHours(11, 0, 0, 0)),
    user: {
      id: 14,
      fullName: "Rajnath Singh",
      department: "Defense",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    startLocation: "Delhi Cantonment",
    endLocation: "South Block, Delhi",
    cab: {
      id: 13,
      number: "DL 06 UV 1234",
      model: "Mercedes E-Class",
      color: "Black"
    },
    status: "Completed"
  },
  {
    id: 14,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 25)).setHours(14, 15, 0, 0)),
    user: {
      id: 15,
      fullName: "Priyanka Gandhi",
      department: "Marketing",
      profileImage: "https://images.unsplash.com/photo-1551727974-8af20a3811ff"
    },
    startLocation: "Lodhi Estate",
    endLocation: "AICC Headquarters, Delhi",
    cab: {
      id: 14,
      number: "DL 07 WX 5678",
      model: "Maruti Suzuki Ertiga",
      color: "Silver"
    },
    status: "Completed"
  }
];

export const liveTrips = [
  {
    id: 1,
    driver: {
      name: "Nitin Gadkari",
      profileImage: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
    },
    user: {
      fullName: "Narendra Modi"
    },
    cab: {
      number: "DL 01 AB 1234",
      model: "Toyota Innova",
      color: "White"
    },
    currentLocation: "Cyber City, Gurugram",
    eta: "10 min",
    status: "On Trip"
  }
];

export const monthlyCostData = [
  { month: "May", cost: 280560 },
  { month: "June", cost: 310420 },
  { month: "July", cost: 295670 },
  { month: "August", cost: 348790 },
  { month: "September", cost: 368230 },
  { month: "October", cost: 386420 }
];

export const dailyCostData = [
  { day: "Mon", cost: 12540 },
  { day: "Tue", cost: 14250 },
  { day: "Wed", cost: 13980 },
  { day: "Thu", cost: 15720 },
  { day: "Fri", cost: 16300 },
  { day: "Sat", cost: 10450 },
  { day: "Sun", cost: 8760 }
];

export const weeklyCostData = [
  { week: "Week 1", cost: 92000 },
  { week: "Week 2", cost: 88500 },
  { week: "Week 3", cost: 95600 },
  { week: "Week 4", cost: 110320 }
];

export const yearlyCostData = [
  { year: "2023", cost: 2850560 },
  { year: "2022", cost: 2210420 },
  { year: "2021", cost: 1895670 }
];

export const billingReports = {
  daily: [
    { id: 101, date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000), period: "Today", amount: 16300, status: "Pending" },
    { id: 102, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), period: "Yesterday", amount: 15720, status: "Pending" },
    { id: 103, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), period: "2 days ago", amount: 13980, status: "Paid" }
  ],
  weekly: [
    { id: 201, date: new Date(Date.now() - 0 * 7 * 24 * 60 * 60 * 1000), period: "This Week", amount: 110320, status: "Pending" },
    { id: 202, date: new Date(Date.now() - 1 * 7 * 24 * 60 * 60 * 1000), period: "Last Week", amount: 95600, status: "Paid" },
    { id: 203, date: new Date(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000), period: "2 Weeks Ago", amount: 88500, status: "Paid" },
    { id: 204, date: new Date(Date.now() - 3 * 7 * 24 * 60 * 60 * 1000), period: "3 Weeks Ago", amount: 92000, status: "Paid" }
  ],
  monthly: [
    { id: 1, date: new Date(2023, 9, 15), period: "October 2023", amount: 386420, status: "Pending" },
    { id: 2, date: new Date(2023, 8, 15), period: "September 2023", amount: 368230, status: "Paid" },
    { id: 3, date: new Date(2023, 7, 15), period: "August 2023", amount: 348790, status: "Paid" },
    { id: 4, date: new Date(2023, 6, 15), period: "July 2023", amount: 295670, status: "Paid" },
    { id: 5, date: new Date(2023, 5, 15), period: "June 2023", amount: 310420, status: "Paid" }
  ],
  yearly: [
    { id: 301, date: new Date(2023, 0, 1), period: "2023", amount: 2850560, status: "Pending" },
    { id: 302, date: new Date(2022, 0, 1), period: "2022", amount: 2210420, status: "Paid" },
    { id: 303, date: new Date(2021, 0, 1), period: "2021", amount: 1895670, status: "Paid" }
  ]
};

export const carpoolSuggestions = [
  {
    id: 1,
    title: "Morning Ride - 9:00 AM",
    savingsAmount: 380,
    user1: {
      id: 2,
      fullName: "Narendra Modi",
      profileImage: "https://images.unsplash.com/photo-1566753323558-f4e0952af115"
    },
    user2: {
      id: 3,
      fullName: "Rahul Gandhi",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    ride1: {
      endLocation: "Cyber City, Gurugram"
    },
    ride2: {
      endLocation: "DLF Phase 5, Gurugram"
    },
    status: "pending"
  },
  {
    id: 2,
    title: "Evening Ride - 6:30 PM",
    savingsAmount: 420,
    user1: {
      id: 4,
      fullName: "Smriti Irani",
      profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
    },
    user2: {
      id: 5,
      fullName: "Amit Shah",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    ride1: {
      endLocation: "Indirapuram, Ghaziabad"
    },
    ride2: {
      endLocation: "Vaishali, Ghaziabad"
    },
    status: "pending"
  }
];

export const carpooledRides = [
  {
    id: 101,
    startTime: new Date(new Date().setHours(9, 0, 0, 0)),
    users: [
      {
        id: 2,
        fullName: "Narendra Modi",
        department: "Sales",
        profileImage: "https://images.unsplash.com/photo-1566753323558-f4e0952af115"
      },
      {
        id: 3,
        fullName: "Rahul Gandhi",
        department: "Marketing",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      }
    ],
    startLocation: "Sector 15, Gurugram",
    endLocation: "Cyber City, Gurugram",
    cab: {
      id: 1,
      number: "DL 01 AB 1234",
      model: "Toyota Innova",
      color: "White"
    },
    status: "Completed",
    savingsAmount: 380
  },
  {
    id: 102,
    startTime: new Date(new Date().setHours(10, 15, 0, 0)),
    users: [
      {
        id: 4,
        fullName: "Smriti Irani",
        department: "HR",
        profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
      },
      {
        id: 5,
        fullName: "Amit Shah",
        department: "Finance",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      }
    ],
    startLocation: "Vaishali, Ghaziabad",
    endLocation: "Noida Sector 62",
    cab: {
      id: 2,
      number: "MH 02 XY 5678",
      model: "Maruti Swift Dzire",
      color: "Silver"
    },
    status: "Confirmed",
    savingsAmount: 420
  },
  {
    id: 103,
    startTime: new Date(new Date().setHours(17, 30, 0, 0)),
    users: [
      {
        id: 6,
        fullName: "Arvind Kejriwal",
        department: "Engineering",
        profileImage: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1"
      },
      {
        id: 7,
        fullName: "Mamata Banerjee",
        department: "Engineering",
        profileImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604"
      },
      {
        id: 8,
        fullName: "Yogi Adityanath",
        department: "Engineering",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      }
    ],
    startLocation: "Whitefield, Bangalore",
    endLocation: "Electronic City, Bangalore",
    cab: {
      id: 3,
      number: "KA 03 CD 9012",
      model: "Honda City",
      color: "Black"
    },
    status: "In Process",
    savingsAmount: 550
  },
  {
    id: 104,
    startTime: new Date(new Date().setHours(9, 30, 0, 0)),
    users: [
      {
        id: 9,
        fullName: "Nitin Gadkari",
        department: "Infrastructure",
        profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
      },
      {
        id: 10,
        fullName: "Sonia Gandhi",
        department: "Administration",
        profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
      }
    ],
    startLocation: "Powai, Mumbai",
    endLocation: "Bandra Kurla Complex, Mumbai",
    cab: {
      id: 4,
      number: "MH 04 CD 5678",
      model: "Honda Amaze",
      color: "Silver"
    },
    status: "Completed",
    savingsAmount: 410
  }
];

// Additional data for the Total Rides page
export const ridesStats = {
  totalRides: 1458,
  completedRides: 1379,
  ongoingRides: 42,
  cancelledRides: 37
};

// Data for Employee Usage Stats
export const employeeStats = {
  employeesServedToday: 145,
  employeesServedThisMonth: 783,
  employees: [
    {
      id: 2,
      fullName: "Narendra Modi",
      branch: "Delhi",
      totalRides: 78,
      ridesToday: 2,
      ridesThisMonth: 22,
      profileImage: "https://images.unsplash.com/photo-1566753323558-f4e0952af115"
    },
    {
      id: 3,
      fullName: "Rahul Gandhi",
      branch: "Mumbai",
      totalRides: 64,
      ridesToday: 1,
      ridesThisMonth: 18,
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    {
      id: 4,
      fullName: "Smriti Irani",
      branch: "Bangalore",
      totalRides: 92,
      ridesToday: 2,
      ridesThisMonth: 25,
      profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
    },
    {
      id: 5,
      fullName: "Amit Shah",
      branch: "Delhi",
      totalRides: 53,
      ridesToday: 1,
      ridesThisMonth: 15,
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      id: 6,
      fullName: "Arvind Kejriwal",
      branch: "Delhi",
      totalRides: 47,
      ridesToday: 0,
      ridesThisMonth: 12,
      profileImage: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1"
    },
    {
      id: 7,
      fullName: "Mamata Banerjee",
      branch: "Kolkata",
      totalRides: 37,
      ridesToday: 1,
      ridesThisMonth: 8,
      profileImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604"
    },
    {
      id: 8,
      fullName: "Yogi Adityanath",
      branch: "Lucknow",
      totalRides: 62,
      ridesToday: 1,
      ridesThisMonth: 14,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      id: 9,
      fullName: "Nitin Gadkari",
      branch: "Nagpur",
      totalRides: 75,
      ridesToday: 2,
      ridesThisMonth: 17,
      profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    {
      id: 10,
      fullName: "Sonia Gandhi",
      branch: "Delhi",
      totalRides: 54,
      ridesToday: 1,
      ridesThisMonth: 13,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    }
  ]
};

// Data for Cost & Billing
export const costBreakdown = {
  totalCost: 1048620,
  avgPerRide: 462,
  costPerKm: 18.5,
  departmentCosts: [
    { department: "Sales", rideCount: 245, totalCost: 278650 },
    { department: "Marketing", rideCount: 189, totalCost: 213420 },
    { department: "HR", rideCount: 156, totalCost: 178350 },
    { department: "Finance", rideCount: 132, totalCost: 146820 },
    { department: "IT", rideCount: 178, totalCost: 198740 },
    { department: "Admin", rideCount: 58, totalCost: 65280 }
  ]
};

// Data for User Reviews
export const reviewsData = {
  averageRating: 4.7,
  totalReviews: 863,
  distributionData: [
    { rating: 5, count: 518 },
    { rating: 4, count: 256 },
    { rating: 3, count: 67 },
    { rating: 2, count: 18 },
    { rating: 1, count: 4 }
  ],
  reviews: [
    {
      id: 1,
      user: {
        id: 2,
        fullName: "Narendra Modi",
        profileImage: "https://images.unsplash.com/photo-1566753323558-f4e0952af115"
      },
      rating: 5,
      comment: "Great service! Driver was on time and very professional. The cab was clean and comfortable.",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      branch: "Delhi",
      isFlagged: false
    },
    {
      id: 2,
      user: {
        id: 3,
        fullName: "Rahul Gandhi",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      rating: 4,
      comment: "Driver arrived a bit late, but the ride was good. The cab was nice and I reached my destination on time.",
      createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000), // 1 day and 1 hour ago
      branch: "Mumbai",
      isFlagged: false
    },
    {
      id: 3,
      user: {
        id: 4,
        fullName: "Smriti Irani",
        profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
      },
      rating: 4.5,
      comment: "Excellent experience! The driver was courteous and the cab was clean. Would highly recommend.",
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      branch: "Bangalore",
      isFlagged: false
    },
    {
      id: 4,
      user: {
        id: 5,
        fullName: "Amit Shah",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      },
      rating: 3,
      comment: "Average experience. The cab was a bit late and not very clean.",
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
      branch: "Delhi",
      isFlagged: true
    },
    {
      id: 5,
      user: {
        id: 7,
        fullName: "Mamata Banerjee",
        profileImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604"
      },
      rating: 5,
      comment: "Perfect ride! The driver was very professional and helpful. The cab was comfortable.",
      createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000), // 4 days ago
      branch: "Kolkata",
      isFlagged: false
    },
    {
      id: 6,
      user: {
        id: 10,
        fullName: "Sonia Gandhi",
        profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
      },
      rating: 4,
      comment: "Good experience overall. The driver was polite and the cab was clean.",
      createdAt: new Date(Date.now() - 120 * 60 * 60 * 1000), // 5 days ago
      branch: "Delhi",
      isFlagged: false
    }
  ]
};

// Live Trip Tracking additional data
export const activeTrips = [
  {
    id: 1,
    driver: {
      name: "Nitin Gadkari",
      profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    },
    user: {
      fullName: "Narendra Modi"
    },
    cab: {
      number: "DL 01 AB 1234",
      model: "Toyota Innova",
      color: "White"
    },
    route: {
      start: "Home, Dwarka",
      destination: "Office, Cyber City"
    },
    eta: "10 min",
    status: "On Trip"
  },
  {
    id: 2,
    driver: {
      name: "Sharad Pawar",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    user: {
      fullName: "Rahul Gandhi"
    },
    cab: {
      number: "MH 02 XY 5678",
      model: "Maruti Swift Dzire",
      color: "Silver"
    },
    route: {
      start: "Home, Andheri",
      destination: "Office, BKC"
    },
    eta: "15 min",
    status: "Delayed"
  },
  {
    id: 3,
    driver: {
      name: "Nirmala Sitharaman",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    user: {
      fullName: "Smriti Irani"
    },
    cab: {
      number: "KA 03 CD 9012",
      model: "Honda City",
      color: "Black"
    },
    route: {
      start: "Home, Whitefield",
      destination: "Office, Electronic City"
    },
    eta: "8 min",
    status: "On Trip"
  }
];
