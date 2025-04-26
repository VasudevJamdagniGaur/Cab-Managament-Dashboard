export const branchOptions = [
  { value: "all", label: "All Branches" },
  { value: "Delhi", label: "Delhi" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Bangalore", label: "Bangalore" },
  { value: "Hyderabad", label: "Hyderabad" }
];

export const dashboardStats = {
  totalRidesToday: 238,
  liveTrips: 42,
  monthlyCost: 386420,
  avgRating: 4.7
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
