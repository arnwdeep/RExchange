import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Search, Heart, User, Sparkles, ArrowRight, Star, CheckCircle, Flame, ChevronRight, X, RefreshCw, MessageSquare, ShieldCheck, MapPin, Clock, Tag, ChevronDown, Send, Check, Plus, Upload, Image as ImageIcon } from 'lucide-react';
import IDCard3D from './IDCard3D';
import HangingLanyard from './HangingLanyard';

// Full Dataset of Aesthetic Pinterest-Style Campus Products & Verified Sellers
const INITIAL_CATALOG_RESOURCES = [
  {
    id: 1,
    title: 'Engineering Mathematics Vol. II',
    category: 'Books',
    image: '/items/math_textbook.jpg',
    condition: 'Like New',
    value: '₹450',
    type: 'Sale / Exchange',
    campus: 'North Campus',
    rating: '4.9',
    postedDate: '2 hours ago',
    description: 'Latest 8th edition, zero markings inside. Complete with solution manual PDF and formula cheat-sheet.',
    specs: ['Author: H.K. Dass', 'Edition: 8th Revised', 'Pages: 940', 'Includes Digital PDF'],
    seller: {
      name: 'Rohan Verma',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
      dept: 'Mechanical Engineering',
      year: '3rd Year',
      college: 'Block B • Room 304',
      rating: '4.9',
      exchanges: 18,
      responseTime: 'Replies in ~5 mins',
      preferredTrade: 'Physics Vol. 1 or Cash',
      verified: true
    }
  },
  {
    id: 2,
    title: 'Sony WH-1000XM4 ANC Headphones',
    category: 'Electronics',
    image: '/items/sony_headphones.jpg',
    condition: 'Good Condition',
    value: '₹1,200',
    type: 'Exchange Only',
    campus: 'Main Quad',
    rating: '4.8',
    postedDate: '1 day ago',
    description: 'Industry-leading noise cancellation. 30hr battery life. Includes original case, aux cable and charging cable.',
    specs: ['Active Noise Cancellation', '30h Battery Life', 'Bluetooth 5.0', 'Original Carrying Case'],
    seller: {
      name: 'Ananya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
      dept: 'Computer Science',
      year: '2nd Year',
      college: 'Hostel 2 • Quad A',
      rating: '4.8',
      exchanges: 24,
      responseTime: 'Replies in ~10 mins',
      preferredTrade: 'Mechanical Keyboard or Apple Pencil',
      verified: true
    }
  },
  {
    id: 3,
    title: 'Python Programming Handwritten Notes',
    category: 'Notes',
    image: '/items/python_notes.jpg',
    condition: 'Excellent',
    value: 'FREE',
    type: 'Free Donation',
    campus: 'CS Block',
    rating: '5.0',
    postedDate: '3 hours ago',
    description: 'Complete Data Structures & Algorithms notes with clean color-coded handwritten diagrams and solved exam problems.',
    specs: ['120 Pages Spiral Bound', 'DSA & Complexity Analysis', 'Python 3 Code Snippets', 'Exam Q&A Included'],
    seller: {
      name: 'Arjun Sen',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=300',
      dept: 'Information Technology',
      year: '4th Year',
      college: 'Library Study Wing',
      rating: '5.0',
      exchanges: 42,
      responseTime: 'Instant Replies',
      preferredTrade: 'Free Campus Share / Coffee',
      verified: true
    }
  },
  {
    id: 4,
    title: 'Casio FX-991EX ClassWiz Calculator',
    category: 'Electronics',
    image: '/items/casio_calculator.jpg',
    condition: 'Like New',
    value: '₹650',
    type: 'Sale / Exchange',
    campus: 'Engineering Wing',
    rating: '4.9',
    postedDate: '5 hours ago',
    description: 'Essential scientific calculator approved for semester university exams. High-resolution LCD, solar powered with protective hard cover.',
    specs: ['552 Functions', 'Natural Textbook Display', 'Solar + Battery Dual Power', 'Hard Slide Cover'],
    seller: {
      name: 'Priya Kapoor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      dept: 'Electrical Engineering',
      year: '2nd Year',
      college: 'Hostel 5',
      rating: '4.9',
      exchanges: 15,
      responseTime: 'Replies in ~15 mins',
      preferredTrade: 'Engineering Drawing Set or Cash',
      verified: true
    }
  },
  {
    id: 5,
    title: 'Custom RGB Mechanical Keyboard',
    category: 'Electronics',
    image: '/items/mechanical_keyboard.jpg',
    condition: 'Mint Condition',
    value: '₹1,800',
    type: 'Exchange',
    campus: 'Hostel 4',
    rating: '4.7',
    postedDate: '2 days ago',
    description: 'Hot-swappable tactile Gateron Brown switches with custom PBT keycaps. Dynamic per-key RGB backlighting.',
    specs: ['Hot-Swappable Switches', 'PBT Double-shot Keycaps', 'USB-C Detachable Braided Cable', 'Per-key RGB'],
    seller: {
      name: 'Dev Malhotra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      dept: 'Electronics & Comm.',
      year: '3rd Year',
      college: 'Hostel 4 • Room 112',
      rating: '4.7',
      exchanges: 11,
      responseTime: 'Replies in ~30 mins',
      preferredTrade: 'Wireless Gaming Mouse or 16GB RAM',
      verified: true
    }
  },
  {
    id: 6,
    title: 'Hackathon VIP Pass & Workshop Ticket',
    category: 'Tickets',
    image: '/items/hackathon_pass.jpg',
    condition: 'Verified Pass',
    value: '₹290',
    type: 'Transfer',
    campus: 'Tech Hub',
    rating: '5.0',
    postedDate: '4 hours ago',
    description: 'Official verified entry pass for annual Inter-College Hackathon event including AI masterclass workshop and swag kit.',
    specs: ['Full 36h Event Access', 'AI & Web3 Workshops', 'Free Swag & Meal Coupons', 'Instant Digital Transfer'],
    seller: {
      name: 'Sarah Lee',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
      dept: 'Design & Media',
      year: '3rd Year',
      college: 'Tech Innovation Hub',
      rating: '5.0',
      exchanges: 30,
      responseTime: 'Replies in ~2 mins',
      preferredTrade: 'Direct Transfer / UPI',
      verified: true
    }
  },
  {
    id: 7,
    title: 'iPad Air M2 with Apple Pencil 2',
    category: 'Electronics',
    image: '/items/ipad_pencil.jpg',
    condition: 'Like New',
    value: '₹3,400',
    type: 'Exchange / Sale',
    campus: 'Main Quad',
    rating: '4.9',
    postedDate: '6 hours ago',
    description: 'Perfect digital note-taking setup for lectures. Includes magnetic folio case, screen protector, and Apple Pencil 2nd Gen.',
    specs: ['M2 Processor • 128GB', 'Apple Pencil 2 Included', 'Liquid Retina Display', 'Paperlike Screen Protector'],
    seller: {
      name: 'Kavya Nair',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      dept: 'Architecture & Design',
      year: '4th Year',
      college: 'Design Studio 3',
      rating: '4.9',
      exchanges: 21,
      responseTime: 'Replies in ~5 mins',
      preferredTrade: 'MacBook Pro or Cash',
      verified: true
    }
  },
  {
    id: 8,
    title: 'Precision Mechanical Drafting Kit',
    category: 'Tools',
    image: '/items/drafting_kit.jpg',
    condition: 'Like New',
    value: '₹850',
    type: 'Exchange / Sale',
    campus: 'Engineering Wing',
    rating: '5.0',
    postedDate: '1 hour ago',
    description: 'Complete professional drafting instrument set with brass compasses, stainless steel rulers, protractors and blueprint tube container.',
    specs: ['Rotring Precision Compass', 'Stainless Steel Ruler Set', 'T-Square & Set Squares', 'Protective Case'],
    seller: {
      name: 'Vikram Mehta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      dept: 'Civil Engineering',
      year: '3rd Year',
      college: 'Drawing Lab A',
      rating: '5.0',
      exchanges: 14,
      responseTime: 'Replies in ~3 mins',
      preferredTrade: 'Scientific Calc or Cash',
      verified: true
    }
  }
];

// Sample preset photo options for sell form
const PRESET_PHOTOS = [
  { label: 'Books', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Headphones', url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Notes', url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Keyboard', url: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Camera / Gear', url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=1000' }
];

export default function ExplorePage({ studentData, onOpenStudentPass }) {
  const [catalogItems, setCatalogItems] = useState(INITIAL_CATALOG_RESOURCES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState([1, 3]);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(3);

  // Sell Item Modal State
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [sellForm, setSellForm] = useState({
    title: '',
    category: 'Books',
    type: 'Sale / Exchange',
    value: '₹500',
    condition: 'Like New',
    campus: 'North Campus',
    description: '',
    specs: '',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=1000'
  });

  // Interactive Live Modals State
  const [activeChatSeller, setActiveChatSeller] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newChatMessage, setNewChatMessage] = useState('');

  const [activeExchangeProposal, setActiveExchangeProposal] = useState(null);
  const [selectedTradeItem, setSelectedTradeItem] = useState('Direct Cash Exchange');
  const [proposalNote, setProposalNote] = useState('');

  // My Exchanges Dedicated Page State
  const [showExchangesPage, setShowExchangesPage] = useState(false);
  const [exchangesTab, setExchangesTab] = useState('All');

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  // Horizontal Left-to-Right Top Slide State for Member ID Card + Lanyard
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDraggingCard, setIsDraggingCard] = useState(false);
  const dragStartRef = useRef({ x: 0 });
  const sellFileInputRef = useRef(null);

  const catalogRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3400);
  }, []);

  // Keyboard shortcut listener for Accessibility: Escape key dismisses open modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedResource) setSelectedResource(null);
        else if (activeChatSeller) setActiveChatSeller(null);
        else if (activeExchangeProposal) setActiveExchangeProposal(null);
        else if (isSellModalOpen) setIsSellModalOpen(false);
        else if (showExchangesPage) setShowExchangesPage(false);
        else if (isSearchOpen) setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedResource, activeChatSeller, activeExchangeProposal, isSellModalOpen, showExchangesPage, isSearchOpen]);

  // Memoized resource filtering for high performance
  const filteredResources = useMemo(() => {
    return catalogItems.filter(item => {
      if (showWishlistOnly) return wishlist.includes(item.id);
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory || (selectedCategory === 'Exchanges' && item.type.includes('Exchange'));
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || item.title.toLowerCase().includes(query) ||
                            item.description.toLowerCase().includes(query) ||
                            item.seller.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [catalogItems, showWishlistOnly, wishlist, selectedCategory, searchQuery]);

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => {
      const isSaved = prev.includes(id);
      showToast(isSaved ? 'Removed from your Wishlist' : 'Saved to your Wishlist!');
      return isSaved ? prev.filter(item => item !== id) : [...prev, id];
    });
  }, [showToast]);

  const handleOpenChat = useCallback((seller, itemTitle) => {
    setActiveChatSeller(seller);
    setChatMessages([
      { sender: 'seller', text: `Hi! Thanks for reaching out about ${itemTitle}. Let me know if you have questions or want to arrange a campus meetup!` }
    ]);
  }, []);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;
    const userMsg = newChatMessage.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setNewChatMessage('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'seller', text: `Sounds great! I'm around ${activeChatSeller?.college || 'campus'} today. What time works best for you?` }
      ]);
    }, 1200);
  }, [newChatMessage, activeChatSeller]);

  const handleSendExchangeProposal = useCallback(() => {
    if (activeExchangeProposal) {
      showToast(`Exchange Proposal sent to ${activeExchangeProposal.seller.name}!`);
      setActiveExchangeProposal(null);
      setSelectedResource(null);
    }
  }, [activeExchangeProposal, showToast]);

  // Secure file upload validation (Max 5MB, JPG/PNG/WEBP only)
  const handleSellPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
        showToast('Invalid file format. Please upload PNG, JPG, or WEBP images.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast('File size exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSellForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!sellForm.title.trim()) {
      showToast('Please enter an item title');
      return;
    }

    const newItem = {
      id: Date.now(),
      title: sellForm.title,
      category: sellForm.category,
      image: sellForm.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=1000',
      condition: sellForm.condition,
      value: sellForm.value || 'FREE',
      type: sellForm.type,
      campus: sellForm.campus,
      rating: '5.0',
      postedDate: 'Just now',
      description: sellForm.description || 'Verified campus listing available for exchange or purchase.',
      specs: sellForm.specs ? sellForm.specs.split(',').map(s => s.trim()) : ['Verified Campus Listing', 'Campus Meetup Ready'],
      seller: {
        name: studentData?.fullName || 'Arjun Sharma',
        avatar: studentData?.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
        dept: studentData?.department || 'Computer Science',
        year: studentData?.year || '2nd Year',
        college: studentData?.college || 'Main Campus',
        rating: '5.0',
        exchanges: 1,
        responseTime: 'Instant Replies',
        preferredTrade: 'Cash or Trade',
        verified: true
      }
    };

    setCatalogItems(prev => [newItem, ...prev]);
    setIsSellModalOpen(false);
    showToast(`"${newItem.title}" listed successfully on RExchange!`);
    
    // Reset form
    setSellForm({
      title: '',
      category: 'Books',
      type: 'Sale / Exchange',
      value: '₹500',
      condition: 'Like New',
      campus: 'North Campus',
      description: '',
      specs: '',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=1000'
    });

    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  // Hold & Slide Card Horizontally Across Top Bar
  const handleCardMouseDown = (e) => {
    setIsDraggingCard(true);
    dragStartRef.current = { x: e.clientX - dragOffset.x };
  };

  const handleCardMouseMove = (e) => {
    if (!isDraggingCard) return;
    const minX = -Math.max(600, window.innerWidth - 220);
    const maxX = 60;
    const newX = Math.max(minX, Math.min(maxX, e.clientX - dragStartRef.current.x));
    setDragOffset({ x: newX, y: 0 });
    setCardTilt({ x: 0, y: -newX * 0.04 });
  };

  const handleCardMouseUp = () => {
    if (!isDraggingCard) return;
    setIsDraggingCard(false);
    setCardTilt({ x: 0, y: 0 });
  };

  // Continuous Smooth Carousel Offset - Dynamic Center Item Fitting (No fixed middle item!)
  const [carouselOffset, setCarouselOffset] = useState(3.0);

  // Smoothly move items on moving the mouse horizontally across the catalog container (Super slow & smooth!)
  const handleCatalogMouseMove = (e) => {
    if (!catalogRef.current || isDraggingCard) return;
    const rect = catalogRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2);
    
    const total = filteredResources.length;
    if (total <= 1) return;

    // Super slow continuous offset shift: normX (-1 to +1) gently glides catalog by 0.85 cards max
    const offsetShift = normX * 0.85;
    const targetOffset = activeIndex + offsetShift;
    setCarouselOffset(targetOffset);

    // Update activeIndex smoothly to whichever item fits in the center
    const newActiveIndex = ((Math.round(targetOffset) % total) + total) % total;
    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  };

  const handleTouchMove = (e) => {
    if (!catalogRef.current || !e.touches[0] || isDraggingCard) return;
    const touch = e.touches[0];
    const rect = catalogRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const normX = (touch.clientX - centerX) / (rect.width / 2);
    
    const total = filteredResources.length;
    if (total <= 1) return;

    const offsetShift = normX * 0.85;
    const targetOffset = activeIndex + offsetShift;
    setCarouselOffset(targetOffset);

    const newActiveIndex = ((Math.round(targetOffset) % total) + total) % total;
    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  };

  const handleSelectCard = (item, index) => {
    setCarouselOffset(index);
    setActiveIndex(index);
    setSelectedResource(item);
  };

  // Dynamic real-time item title based on current active middle item
  const total = filteredResources.length;
  const currentFocusedIndex = total > 0 ? ((Math.round(carouselOffset) % total) + total) % total : 0;
  const currentFocusedItem = filteredResources[currentFocusedIndex] || filteredResources[0];

  return (
    <div
      onMouseMove={(e) => {
        if (isDraggingCard) handleCardMouseMove(e);
        else handleCatalogMouseMove(e);
      }}
      onMouseUp={() => {
        handleCardMouseUp();
        handleCatalogMouseUp();
      }}
      onTouchMove={(e) => {
        if (isDraggingCard && e.touches[0]) {
          const touch = e.touches[0];
          const minX = -Math.max(600, window.innerWidth - 220);
          const maxX = 60;
          const newX = Math.max(minX, Math.min(maxX, touch.clientX - dragStartRef.current.x));
          setDragOffset({ x: newX, y: 0 });
          setCardTilt({ x: 0, y: -newX * 0.04 });
        } else {
          handleTouchMove(e);
        }
      }}
      onTouchEnd={() => {
        handleCardMouseUp();
        handleCatalogMouseUp();
      }}
      className="min-h-screen w-full bg-[#FF4F00] text-white selection:bg-black selection:text-white font-sans relative overflow-x-hidden"
    >
      
      {/* TOAST NOTIFICATION OVERLAY */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-5 py-2.5 rounded-full text-xs font-mono-code font-extrabold uppercase tracking-wider border-2 border-white/30 shadow-2xl flex items-center gap-2 animate-enter-cinematic">
          <Check className="w-4 h-4 text-[#FF4F00]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MEMBER ID CARD WITH LANYARD SLIDING HORIZONTALLY ACROSS TOP PART ONLY FROM LEFT TO RIGHT */}
      <div
        onMouseDown={handleCardMouseDown}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            setIsDraggingCard(true);
            dragStartRef.current = { x: e.touches[0].clientX - dragOffset.x };
          }
        }}
        style={{
          transform: `translate3d(${dragOffset.x}px, 0px, 0px)`,
          transition: isDraggingCard ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        className="fixed top-0 left-36 sm:left-44 md:left-48 z-50 flex flex-col items-center pointer-events-auto cursor-ew-resize active:cursor-grabbing select-none animate-card-shift-top-left-screen"
        title="Hold and slide across top part from left to right • Tap to flip"
      >
        <HangingLanyard isTyping={false} tilt={{ x: 0, y: cardTilt.y - dragOffset.x * 0.05 }} />
        <div className="-mt-3.5 transform origin-top scale-[0.38] sm:scale-[0.42] md:scale-[0.45] hover:scale-[0.50] transition-transform duration-300 shadow-2xl">
          <IDCard3D
            studentData={studentData}
            readOnly={true}
            onTiltChange={setCardTilt}
            onLogout={onOpenStudentPass}
          />
        </div>
      </div>

      {/* 1. EXACT UPLOADED CARABINER BRAND IMAGE FULL SCREEN 100vh HERO SECTION */}
      <section id="hero" className="relative z-10 w-full h-screen min-h-screen flex flex-col justify-between p-4 sm:p-8 md:p-10 transition-all animate-enter-cinematic overflow-hidden bg-[#FF4F00] select-none">
        
        {/* ACTUAL CARABINER HERO IMAGE COVERING 100% OF FULL SCREEN */}
        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center bg-[#FF4F00]">
          <img
            src="/RExchageCarabinerHero.png"
            alt="RExchange Carabiner Hero"
            className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[0.99]"
          />
        </div>

        {/* OVERLAID TOP NAVIGATION BAR */}
        <header className="w-full flex items-center justify-between pb-4 border-b border-black/20 relative z-20">
          
          {/* TOP LEFT: BRAND NAME IN SMALL HELVETICA BOLD (FAR LEFT) */}
          <div className="flex items-center">
            <span className="font-helvetica font-black text-sm sm:text-base text-white tracking-wider uppercase cursor-pointer" onClick={() => { setSelectedCategory('All'); setShowWishlistOnly(false); }}>
              REXCHANGE®
            </span>
          </div>

          {/* CENTER: NAVIGATION OPTIONS & SELL BUTTON */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="flex items-center gap-3 sm:gap-5 text-xs font-mono-code font-extrabold tracking-widest text-white uppercase">
              <button
                onClick={() => {
                  setShowExchangesPage(false);
                  setSelectedCategory('All');
                  setShowWishlistOnly(false);
                  setSearchQuery('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-full transition-all shadow cursor-pointer ${
                  !showExchangesPage && selectedCategory === 'All' && !showWishlistOnly ? 'text-black bg-white/60 font-black' : 'hover:text-black hover:bg-white/30'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => {
                  setShowExchangesPage(false);
                  setSelectedCategory('All');
                  setShowWishlistOnly(false);
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  !showExchangesPage && selectedCategory === 'All' && !showWishlistOnly ? 'hover:text-black font-bold' : 'hover:text-black hover:bg-white/30'
                }`}
              >
                Catalog
              </button>

              <button
                onClick={() => {
                  setShowExchangesPage(true);
                  showToast('Opening My Campus Exchanges & Activity');
                }}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  showExchangesPage ? 'text-black bg-white/60 font-black shadow' : 'hover:text-black hover:bg-white/30'
                }`}
              >
                Exchanges
              </button>
            </nav>

            {/* + SELL ITEM PROMINENT BUTTON */}
            <button
              aria-label="+ SELL ITEM"
              onClick={() => setIsSellModalOpen(true)}
              className="px-4 py-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg text-xs font-mono-code font-extrabold uppercase tracking-wider flex items-center gap-1.5 border border-black"
            >
              <Plus className="w-3.5 h-3.5 text-[#FF4F00]" />
              <span>SELL ITEM</span>
            </button>

            {/* SEARCH LOGO BUTTON */}
            <button
              onClick={() => setIsSearchOpen(prev => !prev)}
              className={`relative p-2 rounded-full border border-white/40 transition-all cursor-pointer shadow ${
                isSearchOpen ? 'bg-black text-[#FF4F00]' : 'bg-black/30 text-white hover:text-black hover:bg-white'
              }`}
              title="Search items"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* WISHLIST COUNTER BUTTON */}
            <button
              onClick={() => {
                setShowWishlistOnly(prev => !prev);
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                showToast(showWishlistOnly ? 'Showing all catalog items' : 'Showing your saved Wishlist items');
              }}
              className={`relative p-2 rounded-full border border-white/40 transition-all cursor-pointer shadow ${
                showWishlistOnly ? 'bg-black text-[#FF4F00]' : 'bg-[#FF4F00] text-white hover:text-black hover:bg-white'
              }`}
              title="Saved items"
            >
              <Heart className="w-3.5 h-3.5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-[#FF4F00] text-[9px] font-extrabold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>

          {/* EXPANDABLE POPUP SEARCH INPUT OVERLAY WITH REAL-TIME MATCH DROPDOWN */}
          {isSearchOpen && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-black/95 border-2 border-white/40 p-3 rounded-2xl shadow-2xl flex flex-col gap-2 animate-enter-cinematic w-80 sm:w-96">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#FF4F00] ml-2" />
                <input
                  type="text"
                  placeholder="Search items, sellers, categories..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveIndex(0);
                    setCarouselOffset(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  autoFocus
                  className="bg-transparent text-xs text-white placeholder-zinc-400 focus:outline-none flex-1 font-mono-code"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveIndex(0);
                      setCarouselOffset(0);
                    }}
                    className="p-1 rounded-full text-zinc-400 hover:text-white"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-black border border-zinc-700 transition-colors"
                  title="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* REAL-TIME SEARCH RESULTS POPUP LIST BELOW INPUT */}
              {searchQuery.trim() && (
                <div className="border-t border-zinc-800 pt-2 space-y-1.5 max-h-60 overflow-y-auto">
                  {filteredResources.length > 0 ? (
                    filteredResources.map((item, idx) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedResource(item);
                          setActiveIndex(idx);
                          setCarouselOffset(idx);
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/90 hover:bg-[#FF4F00] text-white hover:text-black transition-all cursor-pointer group border border-zinc-800"
                      >
                        <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover border border-white/20 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold font-helvetica uppercase truncate">{item.title}</h4>
                          <p className="text-[10px] font-mono-code opacity-80 truncate">{item.category} • {item.value}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-xs font-mono-code text-zinc-400">
                      No matching campus items found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </header>

        {/* BOTTOM SCROLL INDICATOR OVERLAY */}
        <div className="w-full flex items-center justify-between pt-4 border-t border-black/20 text-xs font-mono-code text-white relative z-20 mt-auto">
          <a href="#catalog" className="flex items-center gap-2 text-black font-extrabold uppercase bg-white/40 hover:bg-black hover:text-white px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-lg backdrop-blur">
            <ChevronDown className="w-4 h-4 animate-bounce" />
            <span>SCROLL TO EXPLORE 3D CATALOG</span>
          </a>

          <div className="hidden sm:block font-mono-code text-[10px] text-black font-extrabold uppercase bg-white/30 px-3 py-1 rounded-full backdrop-blur">
            REXCHANGE® • VERIFIED CAMPUS PASS
          </div>
        </div>

      </section>

      {/* 2. CONVEX RAINBOW ARC FANNING CAROUSEL (SMOOTH CONTINUOUS CAROUSEL SLIDER - ZERO FAST SHUFFLING!) */}
      <div className="relative z-10 w-full px-0 pt-4 pb-12 transition-all bg-[#FF4F00] min-h-screen flex flex-col justify-between">

        <section id="catalog" className="py-4 w-full relative overflow-visible flex-1 flex flex-col justify-between">

          {/* OVERFLOW VISIBLE PERSPECTIVE CONTAINER */}
          <div
            ref={catalogRef}
            onMouseMove={handleCatalogMouseMove}
            onTouchMove={handleTouchMove}
            className="perspective-carousel-convex relative w-full h-[540px] sm:h-[600px] md:h-[660px] flex items-center justify-center overflow-visible my-4 cursor-ew-resize select-none"
          >
            
            {/* CONVEX RAINBOW FANNING ARC - UNCLIPPED CARDS */}
            <div className="relative w-full h-full flex items-center justify-center">
              {filteredResources.map((item, index) => {
                const total = filteredResources.length;
                
                // Continuous smooth offset from carouselOffset (Zero fast shuffling!)
                let offset = index - carouselOffset;

                // Circular loop offset calculation
                while (offset > total / 2) offset -= total;
                while (offset < -total / 2) offset += total;

                const isCenter = Math.abs(offset) < 0.5;
                const absOffset = Math.abs(offset);

                const rotateZ = offset * 12; 
                const translateX = offset * 225; 
                const translateY = Math.pow(absOffset, 1.45) * 16; 
                const translateZ = -absOffset * 15;
                const scale = 1.0; 
                const opacity = Math.max(0.45, 1 - absOffset * 0.14);
                const zIndex = Math.round(30 - absOffset);

                return (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${item.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCard(item, index);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectCard(item, index);
                      }
                    }}
                    style={{
                      transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotate(${rotateZ}deg) scale(${scale})`,
                      opacity,
                      zIndex
                    }}
                    className={`carousel-card-convex absolute w-56 sm:w-68 md:w-76 h-[380px] sm:h-[440px] md:h-[480px] bg-white rounded-none overflow-hidden cursor-pointer border-0 outline-none shadow-none active:scale-95 focus:ring-2 focus:ring-black group transition-all duration-300 ${
                      isCenter ? 'ring-2 ring-black' : ''
                    }`}
                    title={`Click to view details for ${item.title}`}
                  >
                    {/* PURE WHITE BACKGROUND STUDIO PRODUCT CUTOUT */}
                    <img
                      src={item.image}
                      alt={item.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCard(item, index);
                      }}
                      className="w-full h-full object-contain p-4 sm:p-6 bg-white rounded-none group-hover:scale-105 transition-transform duration-500 border-0 outline-none shadow-none cursor-pointer"
                    />

                    {/* Subtle Gradient Overlay */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCard(item, index);
                      }}
                      className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-auto rounded-none cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>

          </div>

          {/* DYNAMIC REAL-TIME ITEM TITLE IN COMPACT HELVETICA BOLD FONT */}
          {currentFocusedItem && (
            <div className="w-full text-center my-4 transition-all duration-300 select-none px-4">
              <span
                onClick={() => setSelectedResource(currentFocusedItem)}
                className="font-helvetica font-black text-xs sm:text-sm md:text-base text-white uppercase tracking-widest cursor-pointer hover:text-black transition-colors inline-block drop-shadow-sm"
              >
                {currentFocusedItem.title}
              </span>
            </div>
          )}

        </section>

        {/* 3. FOOTER IN ELEGANT THIN WHITE HELVETICA FONT */}
        <footer className="mt-8 pt-6 border-t border-white/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-helvetica-thin text-white tracking-widest max-w-7xl mx-auto px-4">
          <div>
            <span className="font-helvetica-thin font-light text-white text-base sm:text-lg tracking-[0.2em] uppercase">REXCHANGE®</span>
            <p className="text-[10px] font-helvetica-thin text-white/80 mt-0.5 uppercase tracking-[0.2em]">EXCHANGE • SHARE • GROW • STUDENT COMMUNITY PLATFORM</p>
          </div>

          <div>
            <span className="font-helvetica-thin text-white/80 tracking-widest">© 2026 RExchange Platform</span>
          </div>
        </footer>

      </div>

      {/* DEDICATED MY CAMPUS EXCHANGES & ACTIVITY PAGE */}
      {showExchangesPage && (
        <div role="dialog" aria-modal="true" aria-label="My Campus Exchanges & Activity Dashboard" className="fixed inset-0 z-50 bg-[#FF4F00] text-black w-screen h-screen min-h-screen overflow-y-auto p-4 sm:p-8 md:p-10 animate-enter-cinematic flex flex-col justify-between select-none">
          
          {/* HEADER BAR */}
          <header className="w-full flex items-center justify-between pb-4 border-b border-black max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowExchangesPage(false)}
                className="px-4 py-2 rounded-full bg-black text-white hover:bg-white hover:text-black transition-all text-xs font-mono-code font-black uppercase border border-black flex items-center gap-2 cursor-pointer shadow-md"
              >
                <ArrowRight className="w-4 h-4 transform rotate-180" />
                <span>Back to Home</span>
              </button>
              <span className="font-helvetica font-black text-lg sm:text-xl text-black tracking-wider uppercase">
                REXCHANGE® • MY EXCHANGES & ACTIVITY
              </span>
            </div>

            <button
              onClick={() => setShowExchangesPage(false)}
              className="p-2.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-all cursor-pointer border border-black shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* MAIN CONTENT CONTAINER */}
          <main className="max-w-7xl mx-auto w-full my-6 space-y-8 flex-1">
            
            {/* STATS METRICS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border-2 border-black bg-white/30 p-4 space-y-1">
                <span className="text-[10px] font-mono-code font-black uppercase text-black/80 block">Listed Items</span>
                <span className="text-2xl sm:text-3xl font-black font-mono-code text-black">
                  {catalogItems.filter(i => i.seller?.name === 'Arjun Sharma' || i.isCustom).length + 2}
                </span>
                <span className="text-[9px] font-mono-code text-black/70 block">Active Campus Listings</span>
              </div>

              <div className="border-2 border-black bg-white/30 p-4 space-y-1">
                <span className="text-[10px] font-mono-code font-black uppercase text-black/80 block">Completed Exchanges</span>
                <span className="text-2xl sm:text-3xl font-black font-mono-code text-black">14</span>
                <span className="text-[9px] font-mono-code text-black/70 block">Traded with Campus Peers</span>
              </div>

              <div className="border-2 border-black bg-white/30 p-4 space-y-1">
                <span className="text-[10px] font-mono-code font-black uppercase text-black/80 block">Items Sold</span>
                <span className="text-2xl sm:text-3xl font-black font-mono-code text-black">5</span>
                <span className="text-[9px] font-mono-code text-black/70 block">Direct Peer Sales</span>
              </div>

              <div className="border-2 border-black bg-white/30 p-4 space-y-1">
                <span className="text-[10px] font-mono-code font-black uppercase text-black/80 block">Total Portfolio Value</span>
                <span className="text-2xl sm:text-3xl font-black font-mono-code text-black">₹12,450</span>
                <span className="text-[9px] font-mono-code text-black/70 block">Verified Exchange Value</span>
              </div>
            </div>

            {/* TAB FILTER BAR & SELL BUTTON */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black pb-4">
              <div className="flex items-center gap-2 text-xs font-mono-code font-black uppercase">
                {['All', 'Listed', 'Purchased', 'Sold'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setExchangesTab(tab)}
                    className={`px-4 py-2 border border-black cursor-pointer transition-all ${
                      exchangesTab === tab ? 'bg-black text-white font-extrabold' : 'bg-white/40 text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    {tab === 'All' ? 'All Activity' : tab === 'Listed' ? 'My Listed Items' : tab === 'Purchased' ? 'Purchased & Exchanged' : 'Sold Items'}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowExchangesPage(false);
                  setIsSellModalOpen(true);
                }}
                className="px-5 py-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black font-mono-code font-black text-xs uppercase cursor-pointer flex items-center gap-2 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ List New Item</span>
              </button>
            </div>

            {/* MY EXCHANGES ACTIVITY LIST GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: 'ex-1',
                  title: 'Engineering Mathematics Vol. II',
                  category: 'Books',
                  image: '/items/math_textbook.jpg',
                  status: 'LISTED',
                  type: 'Listed by You',
                  value: '₹450',
                  date: 'Today, 2:15 PM',
                  partner: 'Listed on Campus',
                  notes: 'Active listing visible in 3D Catalog'
                },
                {
                  id: 'ex-2',
                  title: 'Sony WH-1000XM4 ANC Headphones',
                  category: 'Electronics',
                  image: '/items/sony_headphones.jpg',
                  status: 'EXCHANGED',
                  type: 'Campus Exchange',
                  value: '₹1,200',
                  date: 'Yesterday, 6:40 PM',
                  partner: 'Exchanged with Ananya Sharma (CS 2nd Year)',
                  notes: 'Traded for Mechanical Keyboard'
                },
                {
                  id: 'ex-3',
                  title: 'Casio FX-991EX ClassWiz Calculator',
                  category: 'Electronics',
                  image: '/items/casio_calculator.jpg',
                  status: 'PURCHASED',
                  type: 'Campus Purchase',
                  value: '₹650',
                  date: '24 Aug 2026',
                  partner: 'Purchased from Priya Kapoor (EE 2nd Year)',
                  notes: 'Verified exam approved condition'
                },
                {
                  id: 'ex-4',
                  title: 'Python Programming Handwritten Notes',
                  category: 'Notes',
                  image: '/items/python_notes.jpg',
                  status: 'SOLD',
                  type: 'Item Sold',
                  value: '₹350',
                  date: '22 Aug 2026',
                  partner: 'Sold to Arjun Sen (IT 4th Year)',
                  notes: 'UPI payment received'
                },
                {
                  id: 'ex-5',
                  title: 'Hackathon VIP Pass & Workshop Ticket',
                  category: 'Tickets',
                  image: '/items/hackathon_pass.jpg',
                  status: 'EXCHANGED',
                  type: 'Ticket Transfer',
                  value: '₹290',
                  date: '20 Aug 2026',
                  partner: 'Transferred to Sarah Lee (Design 3rd Year)',
                  notes: 'Holographic pass verified'
                }
              ]
              .filter(item => {
                if (exchangesTab === 'Listed') return item.status === 'LISTED';
                if (exchangesTab === 'Purchased') return item.status === 'PURCHASED' || item.status === 'EXCHANGED';
                if (exchangesTab === 'Sold') return item.status === 'SOLD';
                return true;
              })
              .map(item => (
                <div key={item.id} className="border-2 border-black bg-white/40 p-5 flex flex-col justify-between space-y-4 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-24 border border-black bg-white p-1 flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-mono-code font-black px-2 py-0.5 border border-black uppercase ${
                          item.status === 'LISTED' ? 'bg-emerald-400 text-black' :
                          item.status === 'EXCHANGED' ? 'bg-amber-400 text-black' :
                          item.status === 'SOLD' ? 'bg-blue-400 text-black' : 'bg-purple-400 text-black'
                        }`}>
                          {item.status}
                        </span>
                        <span className="text-[11px] font-mono-code font-black text-black">{item.value}</span>
                      </div>

                      <h3 className="text-base font-black font-helvetica uppercase text-black truncate">{item.title}</h3>
                      <p className="text-xs font-mono-code text-black/90 font-bold">{item.partner}</p>
                      <p className="text-[10px] font-mono-code text-black/80">{item.notes}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-black text-[11px] font-mono-code font-bold">
                    <span className="text-black/80">{item.date}</span>
                    <button
                      onClick={() => {
                        const matchedResource = catalogItems.find(r => r.title === item.title) || catalogItems[0];
                        setSelectedResource(matchedResource);
                      }}
                      className="px-3 py-1 border border-black bg-black text-white hover:bg-white hover:text-black transition-all cursor-pointer uppercase"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </main>

          {/* EDITORIAL FOOTER */}
          <footer className="w-full pt-4 border-t border-black flex items-center justify-between text-[11px] font-mono-code font-bold max-w-7xl mx-auto">
            <span>REXCHANGE® • MY CAMPUS EXCHANGES & ACTIVITY</span>
            <span>VERIFIED STUDENT PASSPORT</span>
          </footer>

        </div>
      )}

      {/* FULL SCREEN RESOURCE & SELLER DETAILS OVERLAY (EDITORIAL MINIMAL LAYOUT MATCHING REFERENCE) */}
      {selectedResource && (
        <div role="dialog" aria-modal="true" aria-label="Item details modal" className="fixed inset-0 z-50 bg-[#FF4F00] text-black w-screen h-screen min-h-screen overflow-y-auto p-4 sm:p-8 md:p-10 animate-enter-cinematic flex flex-col justify-between select-none">
          
          {/* TOP BREADCRUMBS & CLOSE HEADER */}
          <header className="w-full flex items-center justify-between pb-4 border-b border-black max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-black/90">
              <span className="cursor-pointer hover:underline" onClick={() => setSelectedResource(null)}>Shop</span>
              <span>•</span>
              <span className="cursor-pointer hover:underline">{selectedResource.category}</span>
              <span>•</span>
              <span className="font-extrabold text-black truncate max-w-[200px] sm:max-w-md">{selectedResource.title}</span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedResource(null)}
              className="p-2.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-all cursor-pointer border border-black shadow-md"
              title="Close View"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* MAIN EDITORIAL GRID SHOWCASE CONTAINER */}
          <main className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start my-6 flex-1">
            
            {/* Left Column: Product Image & Side Preview (Span 6) */}
            <div className="md:col-span-6 flex items-start gap-4 sm:gap-6">
              {/* Vertical Side Thumbnail Preview */}
              <div className="flex flex-col gap-3 flex-shrink-0">
                <div className="w-14 h-16 border-2 border-black bg-white p-1 cursor-pointer shadow-sm">
                  <img src={selectedResource.image} alt={selectedResource.title} className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Main Product Showcase Cutout */}
              <div className="flex-1 flex items-center justify-center min-h-[360px] sm:min-h-[440px] p-6 bg-transparent relative">
                <img
                  src={selectedResource.image}
                  alt={selectedResource.title}
                  className="max-h-[420px] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-extrabold uppercase px-3 py-1 font-mono-code border border-black">
                  {selectedResource.type}
                </div>
              </div>
            </div>

            {/* Right Column: Framed Editorial Details Box (Span 6) */}
            <div className="md:col-span-6 bg-[#FF4F00] border-2 border-black p-6 sm:p-8 space-y-6 shadow-xl">
              
              {/* Header Title & Price Box */}
              <div className="flex items-start justify-between gap-4 border-b border-black pb-5">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black uppercase font-helvetica leading-tight tracking-tight">
                    {selectedResource.title}
                  </h1>
                  <div className="flex items-center gap-2 text-xs font-mono-code font-bold">
                    <span className="flex items-center gap-1 text-black">
                      <Star className="w-3.5 h-3.5 fill-black text-black" /> {selectedResource.rating} rating
                    </span>
                    <span>•</span>
                    <span className="text-black/90 uppercase">{selectedResource.seller.exchanges} Campus Exchanges</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-3xl sm:text-4xl font-black text-black font-mono-code block">{selectedResource.value}</span>
                  <span className="text-[10px] font-mono-code text-black/80 uppercase font-bold block">{selectedResource.condition}</span>
                </div>
              </div>

              {/* DESCRIPTION SECTION */}
              <div className="space-y-2 border-b border-black pb-5">
                <h4 className="text-xs font-mono-code font-black text-black uppercase tracking-widest">DESCRIPTION</h4>
                <p className="text-xs sm:text-sm text-black/95 leading-relaxed font-semibold">
                  {selectedResource.description}
                </p>
              </div>

              {/* FOR / SPECIFICATIONS SECTION */}
              {selectedResource.specs && (
                <div className="space-y-2 border-b border-black pb-5">
                  <h4 className="text-xs font-mono-code font-black text-black uppercase tracking-widest">FOR / SPECIFICATIONS</h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedResource.specs.map((spec, i) => (
                      <span key={i} className="text-xs font-mono-code border border-black px-3 py-1 bg-white/20 text-black font-bold uppercase">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* VERIFIED SELLER DETAILS SECTION */}
              <div className="space-y-3 border-b border-black pb-5">
                <h4 className="text-xs font-mono-code font-black text-black uppercase tracking-widest flex items-center justify-between">
                  <span>VERIFIED CAMPUS SELLER</span>
                  <span className="text-[10px] text-emerald-950 font-bold bg-emerald-400 px-2 py-0.5 border border-black">Active</span>
                </h4>

                <div className="flex items-center gap-3">
                  <img src={selectedResource.seller.avatar} alt={selectedResource.seller.name} className="w-10 h-10 border border-black object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-black font-helvetica uppercase text-black truncate">{selectedResource.seller.name}</h5>
                    <p className="text-[11px] font-mono-code text-black/90 truncate">{selectedResource.seller.dept} • {selectedResource.seller.year}</p>
                    <p className="text-[10px] font-mono-code text-black/80 truncate">Location: {selectedResource.seller.college} ({selectedResource.campus})</p>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON GRID MATCHING REFERENCE */}
              <div className="pt-2 grid grid-cols-12 gap-2">
                {/* Save to Wishlist Heart Button */}
                <button
                  onClick={() => toggleWishlist(selectedResource.id)}
                  className="col-span-2 border-2 border-black bg-white hover:bg-black text-black hover:text-white p-3.5 flex items-center justify-center transition-all cursor-pointer"
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlist.includes(selectedResource.id) ? 'fill-[#FF4F00] text-[#FF4F00]' : ''}`} />
                </button>

                {/* Chat with Seller Button */}
                <button
                  onClick={() => handleOpenChat(selectedResource.seller, selectedResource.title)}
                  className="col-span-5 border-2 border-black bg-white hover:bg-black text-black hover:text-white font-mono-code font-black text-xs uppercase p-3.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHAT SELLER</span>
                </button>

                {/* Request Exchange Button */}
                <button
                  onClick={() => setActiveExchangeProposal(selectedResource)}
                  className="col-span-5 border-2 border-black bg-black hover:bg-white text-white hover:text-black font-mono-code font-black text-xs uppercase p-3.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>REQUEST TRADE →</span>
                </button>
              </div>

            </div>

          </main>

          {/* EDITORIAL FOOTER */}
          <footer className="w-full pt-4 border-t border-black flex items-center justify-between text-[11px] font-mono-code font-bold max-w-7xl mx-auto">
            <span>REXCHANGE® • VERIFIED CAMPUS PASSPORT</span>
            <span>MINIMALIST EDITORIAL EDITION</span>
          </footer>

        </div>
      )}

      {/* INTERACTIVE SELL ITEM MODAL (MATCHING VIBRANT ORANGE THEME) */}
      {isSellModalOpen && (
        <div role="dialog" aria-modal="true" aria-label="Sell item modal" className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FF4F00] border-3 border-black text-black max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5 animate-enter-cinematic my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Close Button */}
            <button
              aria-label="Close listing form"
              onClick={() => setIsSellModalOpen(false)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-all cursor-pointer z-20 shadow-md border border-black"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b-2 border-black pb-3">
              <span className="text-[10px] font-mono-code font-extrabold text-black/80 uppercase block">Campus Marketplace</span>
              <h2 className="text-2xl sm:text-3xl font-black font-helvetica uppercase text-black flex items-center gap-2">
                <Plus className="w-7 h-7 text-black" /> LIST AN ITEM FOR SALE / EXCHANGE
              </h2>
            </div>

            {/* Form Container */}
            <form onSubmit={handleCreateListing} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono-code font-extrabold text-black uppercase mb-1">Item Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sony WH-1000XM4 ANC Headphones"
                    value={sellForm.title}
                    onChange={(e) => setSellForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-white text-black text-xs font-bold px-4 py-3 rounded-xl border-2 border-black focus:outline-none placeholder-zinc-400"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-mono-code font-extrabold text-black uppercase mb-1">Category</label>
                  <select
                    value={sellForm.category}
                    onChange={(e) => setSellForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-white text-black text-xs font-bold px-4 py-3 rounded-xl border-2 border-black focus:outline-none"
                  >
                    <option value="Books">Books & Textbooks</option>
                    <option value="Electronics">Electronics & Gadgets</option>
                    <option value="Notes">Handwritten Notes & Papers</option>
                    <option value="Tools">Tools & Lab Equipment</option>
                    <option value="Tickets">Events & Pass Tickets</option>
                  </select>
                </div>

                {/* Listing Type */}
                <div>
                  <label className="block text-xs font-mono-code font-extrabold text-black uppercase mb-1">Listing Type</label>
                  <select
                    value={sellForm.type}
                    onChange={(e) => setSellForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-white text-black text-xs font-bold px-4 py-3 rounded-xl border-2 border-black focus:outline-none"
                  >
                    <option value="Sale / Exchange">Sale or Exchange</option>
                    <option value="Exchange Only">Exchange Only</option>
                    <option value="Free Donation">Free Campus Donation</option>
                  </select>
                </div>

                {/* Price / Value */}
                <div>
                  <label className="block text-xs font-mono-code font-extrabold text-black uppercase mb-1">Price / Value</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹650 or FREE"
                    value={sellForm.value}
                    onChange={(e) => setSellForm(prev => ({ ...prev, value: e.target.value }))}
                    className="w-full bg-white text-black text-xs font-bold px-4 py-3 rounded-xl border-2 border-black focus:outline-none"
                  />
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-xs font-mono-code font-extrabold text-black uppercase mb-1">Condition</label>
                  <select
                    value={sellForm.condition}
                    onChange={(e) => setSellForm(prev => ({ ...prev, condition: e.target.value }))}
                    className="w-full bg-white text-black text-xs font-bold px-4 py-3 rounded-xl border-2 border-black focus:outline-none"
                  >
                    <option value="Like New">Like New</option>
                    <option value="Mint Condition">Mint Condition</option>
                    <option value="Good Condition">Good Condition</option>
                    <option value="Fair">Fair / Usable</option>
                  </select>
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono-code font-extrabold text-black uppercase mb-1">Description & Condition Details</label>
                <textarea
                  rows="3"
                  placeholder="Describe your item, usage duration, included cables or manuals..."
                  value={sellForm.description}
                  onChange={(e) => setSellForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-white text-black text-xs font-medium px-4 py-3 rounded-xl border-2 border-black focus:outline-none placeholder-zinc-400"
                />
              </div>

              {/* Specs comma separated */}
              <div>
                <label className="block text-xs font-mono-code font-extrabold text-black uppercase mb-1">Key Features / Specs (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. 8th Edition, Includes Solution PDF, 30h Battery"
                  value={sellForm.specs}
                  onChange={(e) => setSellForm(prev => ({ ...prev, specs: e.target.value }))}
                  className="w-full bg-white text-black text-xs font-bold px-4 py-3 rounded-xl border-2 border-black focus:outline-none placeholder-zinc-400"
                />
              </div>

              {/* PHOTO UPLOAD & PRESETS */}
              <div className="space-y-2">
                <label className="block text-xs font-mono-code font-extrabold text-black uppercase">Item Photo *</label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  
                  {/* File Upload Box */}
                  <div
                    onClick={() => sellFileInputRef.current?.click()}
                    className="flex-1 w-full bg-white/40 border-2 border-dashed border-black rounded-2xl p-4 flex items-center justify-center gap-3 cursor-pointer hover:bg-white/60 transition-all text-center"
                  >
                    <Upload className="w-6 h-6 text-black" />
                    <div>
                      <span className="text-xs font-mono-code font-extrabold text-black uppercase block">Upload Photo</span>
                      <span className="text-[10px] text-black/70">Click to choose image file</span>
                    </div>
                    <input
                      type="file"
                      ref={sellFileInputRef}
                      onChange={handleSellPhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {/* Selected Image Preview */}
                  {sellForm.image && (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-black flex-shrink-0 relative shadow-md">
                      <img src={sellForm.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute top-1 right-1 bg-black text-white p-0.5 rounded-full text-[8px]">
                        <Check className="w-3 h-3 text-[#FF4F00]" />
                      </div>
                    </div>
                  )}

                </div>

                {/* Sample Preset Photos */}
                <div className="pt-1">
                  <span className="text-[10px] font-mono-code font-extrabold text-black uppercase block mb-1">Or Pick A Preset Sample Photo:</span>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_PHOTOS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSellForm(prev => ({ ...prev, image: preset.url }))}
                        className={`text-[10px] font-mono-code px-3 py-1 rounded-full border border-black font-extrabold cursor-pointer transition-all ${
                          sellForm.image === preset.url ? 'bg-black text-white' : 'bg-white/50 text-black hover:bg-black hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* SUBMIT LISTING BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-black text-white hover:bg-white hover:text-black font-extrabold text-xs uppercase font-mono-code rounded-2xl border-2 border-black transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-[#FF4F00]" />
                  <span>PUBLISH ITEM TO CAMPUS CATALOG</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* INTERACTIVE LIVE CHAT WITH SELLER MODAL */}
      {activeChatSeller && (
        <div role="dialog" aria-modal="true" aria-label="Live chat modal" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FF4F00] border-2 border-black text-black max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-4 animate-enter-cinematic flex flex-col h-[520px]">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center gap-3">
                <img src={activeChatSeller.avatar} alt={activeChatSeller.name} className="w-10 h-10 rounded-full border-2 border-black object-cover" />
                <div>
                  <h3 className="font-extrabold font-helvetica uppercase text-sm">{activeChatSeller.name}</h3>
                  <span className="text-[10px] font-mono-code font-extrabold text-black/80 block">{activeChatSeller.dept}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveChatSeller(null)}
                className="p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-all border border-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-white/30 rounded-2xl border border-black/30">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs font-mono-code ${
                      msg.sender === 'user'
                        ? 'bg-black text-white rounded-br-none border border-black'
                        : 'bg-white text-black font-bold rounded-bl-none border border-black'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Type a campus message..."
                value={newChatMessage}
                onChange={(e) => setNewChatMessage(e.target.value)}
                className="flex-1 bg-white text-black text-xs font-bold px-4 py-3 rounded-xl border-2 border-black focus:outline-none placeholder-zinc-400 font-mono-code"
              />
              <button
                type="submit"
                className="p-3 bg-black text-white rounded-xl border-2 border-black hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}

      {/* INTERACTIVE REQUEST EXCHANGE PROPOSAL MODAL */}
      {activeExchangeProposal && (
        <div role="dialog" aria-modal="true" aria-label="Exchange proposal modal" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FF4F00] border-2 border-black text-black max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-5 animate-enter-cinematic">
            
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <h3 className="font-black font-helvetica uppercase text-base">REQUEST EXCHANGE</h3>
              <button
                onClick={() => setActiveExchangeProposal(null)}
                className="p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-all border border-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-black text-white p-3 rounded-2xl flex items-center gap-3 border border-black">
              <img src={activeExchangeProposal.image} alt={activeExchangeProposal.title} className="w-14 h-14 rounded-xl object-cover border border-white/30" />
              <div>
                <span className="text-[9px] font-mono-code text-[#FF4F00] uppercase font-bold">Requesting Item</span>
                <h4 className="font-extrabold font-helvetica uppercase text-xs text-white">{activeExchangeProposal.title}</h4>
                <span className="text-[10px] font-mono-code text-zinc-300">Value: {activeExchangeProposal.value}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs font-mono-code font-bold">
              <div>
                <label className="block text-[10px] uppercase text-black mb-1">Select What You Offer In Exchange:</label>
                <select
                  value={selectedTradeItem}
                  onChange={(e) => setSelectedTradeItem(e.target.value)}
                  className="w-full bg-white text-black p-2.5 rounded-xl border-2 border-black focus:outline-none"
                >
                  <option value="Direct Cash Exchange">Direct Cash Exchange ({activeExchangeProposal.value})</option>
                  <option value="Physics Vol. 1 Textbook">Physics Vol. 1 Textbook</option>
                  <option value="Scientific Drafting Kit">Scientific Drafting Kit</option>
                  <option value="Custom Offer + Cash">Custom Item Offer + Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-black mb-1">Add Note to Seller ({activeExchangeProposal.seller.name}):</label>
                <textarea
                  rows="3"
                  placeholder="Hey! I am interested in exchanging for your item..."
                  value={proposalNote}
                  onChange={(e) => setProposalNote(e.target.value)}
                  className="w-full bg-[#FF4F00] text-black p-2.5 rounded-xl border-2 border-black focus:outline-none text-xs font-sans font-medium"
                />
              </div>
            </div>

            <button
              onClick={handleSendExchangeProposal}
              className="w-full py-3.5 bg-black text-white hover:bg-white hover:text-black font-extrabold text-xs uppercase font-mono-code rounded-xl border-2 border-black transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <span>Send Official Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
