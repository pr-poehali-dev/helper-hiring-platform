import { useState, useEffect } from 'react';
import { Moon, Sun, Search, Star, Users, HelpCircle, FileText } from 'lucide-react';
import WorkerProfile from './WorkerProfile';
import OrganizationProfile from './OrganizationProfile';
import ContractSignature, { SignatureData } from '@/components/ContractSignature';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [userType, setUserType] = useState<'worker' | 'organization' | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showContractDialog, setShowContractDialog] = useState(false);
  const [selectedExecutor, setSelectedExecutor] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const workers = [
    {
      id: 1,
      name: 'Александр Петров',
      specialty: 'Сантехник, электрик',
      rating: 4.8,
      reviews: 127,
      price: '2500₽/час',
      image: '👨‍🔧',
      type: 'worker',
      category: 'Сантехника'
    },
    {
      id: 2,
      name: 'Мария Иванова',
      specialty: 'Уборка, помощь по хозяйству',
      rating: 4.9,
      reviews: 215,
      price: '1800₽/час',
      image: '👩‍💼',
      type: 'worker',
      category: 'Уборка'
    },
    {
      id: 3,
      name: 'Дмитрий Сидоров',
      specialty: 'Грузчик, переезды',
      rating: 4.7,
      reviews: 89,
      price: '2000₽/час',
      image: '💪',
      type: 'worker',
      category: 'Переезды'
    },
    {
      id: 4,
      name: 'Иван Строитель',
      specialty: 'Строительство, ремонт',
      rating: 4.9,
      reviews: 156,
      price: '3000₽/час',
      image: '👷',
      type: 'worker',
      category: 'Строительство'
    }
  ];

  const organizations = [
    {
      id: 1,
      name: 'Мастер на час',
      type: 'Универсальные услуги',
      workers: 45,
      rating: 4.8,
      price: 'от 2000₽/час',
      executorType: 'organization',
      category: 'Ремонт'
    },
    {
      id: 2,
      name: 'Чистый дом',
      type: 'Клининговые услуги',
      workers: 32,
      rating: 4.9,
      price: 'от 1500₽/час',
      executorType: 'organization',
      category: 'Уборка'
    },
    {
      id: 3,
      name: 'СтройПро',
      type: 'Строительные работы',
      workers: 58,
      rating: 4.7,
      price: 'от 3500₽/час',
      executorType: 'organization',
      category: 'Строительство'
    }
  ];

  const categories = [
    { name: 'Сантехника', icon: '🔧' },
    { name: 'Электрика', icon: '⚡' },
    { name: 'Уборка', icon: '🧹' },
    { name: 'Переезды', icon: '📦' },
    { name: 'Ремонт', icon: '🔨' },
    { name: 'Садовник', icon: '🌱' },
    { name: 'Строительство', icon: '🏗️' }
  ];

  const faqItems = [
    {
      question: 'Как нанять работника?',
      answer: 'Выберите подходящего специалиста в каталоге, нажмите "Связаться" и договоритесь о деталях работы.'
    },
    {
      question: 'Какие гарантии предоставляются?',
      answer: 'Все исполнители проходят верификацию. Мы предоставляем гарантию возврата средств в случае некачественной работы.'
    },
    {
      question: 'Как стать исполнителем?',
      answer: 'Зарегистрируйтесь через раздел "Регистрация исполнителя", заполните профиль и пройдите верификацию.'
    },
    {
      question: 'Какова стоимость услуг?',
      answer: 'Стоимость зависит от типа работ и опыта исполнителя. В среднем от 1500₽ до 3000₽ в час.'
    }
  ];

  const allExecutors = [
    ...workers.map(w => ({ ...w, executorType: 'worker' as const })),
    ...organizations
  ];

  const handleSearch = () => {
    if (searchQuery.trim() && !searchHistory.includes(searchQuery.trim())) {
      const newHistory = [searchQuery.trim(), ...searchHistory].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
    setShowSearchResults(true);
    setActiveTab('search');
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setShowSearchResults(true);
    setActiveTab('search');
  };

  const handleContactClick = (executor: any) => {
    setSelectedExecutor(executor);
    setShowContractDialog(true);
  };

  const handleContractSign = (signatureData: SignatureData) => {
    const newOrder = {
      id: Date.now(),
      executor: selectedExecutor,
      contract: signatureData,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    setOrders([...orders, newOrder]);
    setShowContractDialog(false);
    setActiveTab('orders');
  };

  const parsePrice = (priceStr: string) => {
    const match = priceStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const sortExecutors = (executors: any[]) => {
    if (!sortBy) return executors;
    
    return [...executors].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'price-asc') {
        return parsePrice(a.price) - parsePrice(b.price);
      } else if (sortBy === 'price-desc') {
        return parsePrice(b.price) - parsePrice(a.price);
      }
      return 0;
    });
  };

  const filteredExecutors = sortExecutors(allExecutors.filter(executor => {
    const matchesSearch = searchQuery === '' || 
      executor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (executor.type ? executor.type.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
      (executor.specialty ? executor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) : false);
    
    const matchesCategory = !selectedCategory || executor.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }));

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Wrench" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold">Хелперс</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveTab('home')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}>
                Главная
              </button>
              <button onClick={() => setActiveTab('workers')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'workers' ? 'text-primary' : 'text-muted-foreground'}`}>
                Каталог рабочих
              </button>
              <button onClick={() => setActiveTab('organizations')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'organizations' ? 'text-primary' : 'text-muted-foreground'}`}>
                Организации
              </button>
              <button onClick={() => setActiveTab('orders')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'orders' ? 'text-primary' : 'text-muted-foreground'}`}>
                Мои заявки
              </button>
              <button onClick={() => setActiveTab('register')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'register' ? 'text-primary' : 'text-muted-foreground'}`}>
                Стать исполнителем
              </button>
              <button onClick={() => setActiveTab('faq')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'faq' ? 'text-primary' : 'text-muted-foreground'}`}>
                FAQ
              </button>
            </nav>

            <div className="flex items-center gap-2">
              {isRegistered && (
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('profile')}
                >
                  <Icon name="User" className="mr-2 h-4 w-4" />
                  Мой профиль
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className="rounded-full"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <section className="text-center space-y-6 py-12">
              <h2 className="text-4xl md:text-5xl font-bold">
                Найдите идеального помощника
                <br />
                <span className="text-primary">за считанные минуты</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Тысячи проверенных специалистов готовы помочь вам с любой задачей
              </p>
              
              <div className="flex gap-2 max-w-2xl mx-auto mt-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Поиск услуг: сантехник, уборка, грузчик..."
                    className="pl-10 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                </div>
                <Button size="lg" className="h-12 px-8" onClick={handleSearch}>
                  Найти
                </Button>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-6">Популярные категории</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {categories.map((category, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                      <span className="text-4xl">{category.icon}</span>
                      <p className="text-sm font-medium text-center">{category.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-6">Топ исполнителей</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {workers.slice(0, 3).map((worker) => (
                  <Card key={worker.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-5xl">{worker.image}</div>
                          <div>
                            <CardTitle className="text-lg">{worker.name}</CardTitle>
                            <CardDescription>{worker.specialty}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-semibold">{worker.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({worker.reviews} отзывов)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{worker.price}</span>
                        <Button onClick={() => handleContactClick(worker)}>Связаться</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold">Результаты поиска</h2>
                {selectedCategory && (
                  <p className="text-muted-foreground mt-2">
                    Категория: {selectedCategory}
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => setSelectedCategory(null)}
                      className="ml-2"
                    >
                      Сбросить
                    </Button>
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground mr-2">Найдено: {filteredExecutors.length}</p>
                <div className="flex gap-2">
                  <Button 
                    variant={sortBy === 'rating' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy(sortBy === 'rating' ? null : 'rating')}
                  >
                    По рейтингу
                  </Button>
                  <Button 
                    variant={sortBy === 'price-asc' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy(sortBy === 'price-asc' ? null : 'price-asc')}
                  >
                    Цена ↑
                  </Button>
                  <Button 
                    variant={sortBy === 'price-desc' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy(sortBy === 'price-desc' ? null : 'price-desc')}
                  >
                    Цена ↓
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExecutors.map((executor) => (
                <Card key={`${executor.executorType}-${executor.id}`} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {executor.executorType === 'worker' ? (
                          <div className="text-5xl">{executor.image}</div>
                        ) : (
                          <div className="p-4 bg-primary/10 rounded-lg">
                            <Icon name="Building2" size={32} className="text-primary" />
                          </div>
                        )}
                        <div className="flex-1">
                          <CardTitle className="text-lg">{executor.name}</CardTitle>
                          <CardDescription>
                            {executor.executorType === 'worker' ? executor.specialty : executor.type}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{executor.executorType === 'worker' ? 'Рабочий' : 'Организация'}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{executor.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({executor.executorType === 'worker' ? `${executor.reviews} отзывов` : `${executor.workers} сотрудников`})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{executor.price}</span>
                      <Button onClick={() => handleContactClick(executor)}>Связаться</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Каталог рабочих</h2>
                <div className="flex gap-2">
                  <Button 
                    variant={sortBy === 'rating' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy(sortBy === 'rating' ? null : 'rating')}
                  >
                    По рейтингу
                  </Button>
                  <Button 
                    variant={sortBy === 'price-asc' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy(sortBy === 'price-asc' ? null : 'price-asc')}
                  >
                    Цена ↑
                  </Button>
                  <Button 
                    variant={sortBy === 'price-desc' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy(sortBy === 'price-desc' ? null : 'price-desc')}
                  >
                    Цена ↓
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedCategory === null ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Все категории
                </Button>
                {categories.map((cat) => (
                  <Button 
                    key={cat.name}
                    variant={selectedCategory === cat.name ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.icon} {cat.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortExecutors(workers.filter(w => !selectedCategory || w.category === selectedCategory)).map((worker) => (
                <Card key={worker.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="text-5xl">{worker.image}</div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{worker.name}</CardTitle>
                        <CardDescription>{worker.specialty}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{worker.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({worker.reviews} отзывов)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{worker.price}</span>
                      <Button onClick={() => handleContactClick(worker)}>Связаться</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'organizations' && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Каталог организаций</h2>
                <div className="flex gap-2">
                  <Button 
                    variant={sortBy === 'rating' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy(sortBy === 'rating' ? null : 'rating')}
                  >
                    По рейтингу
                  </Button>
                  <Button 
                    variant={sortBy === 'price-asc' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy(sortBy === 'price-asc' ? null : 'price-asc')}
                  >
                    Цена ↑
                  </Button>
                  <Button 
                    variant={sortBy === 'price-desc' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy(sortBy === 'price-desc' ? null : 'price-desc')}
                  >
                    Цена ↓
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedCategory === null ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Все категории
                </Button>
                {categories.map((cat) => (
                  <Button 
                    key={cat.name}
                    variant={selectedCategory === cat.name ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.icon} {cat.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {sortExecutors(organizations.filter(o => !selectedCategory || o.category === selectedCategory)).map((org) => (
                <Card key={org.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{org.name}</CardTitle>
                        <CardDescription>{org.type}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        <Users className="h-3 w-3 mr-1" />
                        {org.workers} чел
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{org.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Рейтинг организации</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{org.price}</span>
                      <Button onClick={() => handleContactClick(org)}>Связаться</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'register' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Регистрация исполнителя</h2>
              <p className="text-muted-foreground">Начните зарабатывать на своих навыках уже сегодня</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Выберите тип регистрации</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="individual" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="individual">
                      <Icon name="User" className="mr-2 h-4 w-4" />
                      Самостоятельный
                    </TabsTrigger>
                    <TabsTrigger value="organization">
                      <Icon name="Building2" className="mr-2 h-4 w-4" />
                      Организация
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="individual" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ваше имя</label>
                      <Input 
                        placeholder="Иван Иванов" 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Специальность</label>
                      <Input 
                        placeholder="Сантехник, электрик" 
                        onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Телефон</label>
                      <Input 
                        placeholder="+7 (900) 123-45-67" 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Стоимость услуг (руб/час)</label>
                      <Input 
                        type="number" 
                        placeholder="2000" 
                        onChange={(e) => setProfileData({...profileData, price: e.target.value + '₽/час'})}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => {
                        setUserType('worker');
                        setIsRegistered(true);
                        setActiveTab('profile');
                      }}
                    >
                      Зарегистрироваться
                    </Button>
                  </TabsContent>
                  <TabsContent value="organization" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Название организации</label>
                      <Input 
                        placeholder="ООО Мастер" 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Тип услуг</label>
                      <Input 
                        placeholder="Клининг, ремонт" 
                        onChange={(e) => setProfileData({...profileData, type: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Количество сотрудников</label>
                      <Input 
                        type="number" 
                        placeholder="10" 
                        onChange={(e) => setProfileData({...profileData, workers: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Контактный телефон</label>
                      <Input 
                        placeholder="+7 (900) 123-45-67" 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => {
                        setUserType('organization');
                        setIsRegistered(true);
                        setActiveTab('profile');
                      }}
                    >
                      Зарегистрировать организацию
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Мои заявки</h2>
            
            {orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
                  <p className="text-muted-foreground">У вас пока нет активных заявок</p>
                  <Button className="mt-4" onClick={() => setActiveTab('home')}>
                    Найти исполнителя
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>
                            {order.executor.executorType === 'worker' 
                              ? order.executor.specialty 
                              : order.executor.type}
                          </CardTitle>
                          <CardDescription>
                            {order.executor.name} • {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                          </CardDescription>
                        </div>
                        <Badge variant={order.status === 'active' ? 'default' : 'secondary'}>
                          {order.status === 'active' ? 'Активна' : 'Завершена'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">Стоимость:</span>
                          <span className="font-bold text-primary">{order.executor.price}</span>
                        </div>
                        
                        <div className="border-t pt-4 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => {
                              const contractText = order.executor.executorType === 'worker'
                                ? `ДОГОВОР ВОЗМЕЗДНОГО ОКАЗАНИЯ УСЛУГ\n\nг. Москва    ${order.contract.signatureDate}\n\nЗАКАЗЧИК: ${order.contract.clientFullName}\nПаспорт: ${order.contract.clientPassport}\nАдрес: ${order.contract.clientAddress}\n\nИСПОЛНИТЕЛЬ: ${order.contract.executorFullName}\nПаспорт: ${order.contract.executorPassport}\nАдрес: ${order.contract.executorAddress}\n\nУслуга: ${order.executor.specialty}\nСтоимость: ${order.executor.price}\n\nКонтакты Заказчика:\nТелефон: ${order.contract.clientPhone}\nEmail: ${order.contract.clientEmail}\n\nДоговор подписан электронной подписью ${order.contract.signatureDate}`
                                : `ДОГОВОР НА ОКАЗАНИЕ УСЛУГ\n\nг. Москва    ${order.contract.signatureDate}\n\nЗАКАЗЧИК: ${order.contract.clientFullName}\nПаспорт: ${order.contract.clientPassport}\nАдрес: ${order.contract.clientAddress}\n\nИСПОЛНИТЕЛЬ: ${order.contract.executorFullName}\nИНН: ${order.contract.executorINN}\nАдрес: ${order.contract.executorAddress}\n\nУслуга: ${order.executor.type}\nСтоимость: ${order.executor.price}\n\nКонтакты Заказчика:\nТелефон: ${order.contract.clientPhone}\nEmail: ${order.contract.clientEmail}\n\nДоговор подписан электронной подписью ${order.contract.signatureDate}`;
                              
                              alert(contractText);
                            }}
                          >
                            <Icon name="FileText" className="mr-2 h-4 w-4" />
                            Посмотреть договор
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <HelpCircle className="h-12 w-12 mx-auto text-primary" />
              <h2 className="text-3xl font-bold">Вопросы и ответы</h2>
              <p className="text-muted-foreground">Ответы на часто задаваемые вопросы</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Icon name="MessageCircle" className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Не нашли ответ?</h3>
                    <p className="text-sm text-muted-foreground mb-4">Свяжитесь с нашей службой поддержки</p>
                    <Button>Написать в поддержку</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && isRegistered && (
          <>
            {userType === 'worker' ? (
              <WorkerProfile 
                profileData={profileData} 
                onBack={() => setActiveTab('home')}
                onUpdateProfile={(data) => setProfileData(data)}
              />
            ) : (
              <OrganizationProfile 
                profileData={profileData} 
                onBack={() => setActiveTab('home')}
                onUpdateProfile={(data) => setProfileData(data)}
              />
            )}
          </>
        )}
      </main>

      <Dialog open={showContractDialog} onOpenChange={setShowContractDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Оформление заявки</DialogTitle>
            <DialogDescription>
              Для оформления заявки необходимо подписать договор электронной подписью
            </DialogDescription>
          </DialogHeader>
          {selectedExecutor && (
            <ContractSignature
              contractType={selectedExecutor.executorType === 'worker' ? 'worker' : 'organization'}
              executorName={selectedExecutor.name}
              serviceName={selectedExecutor.executorType === 'worker' ? selectedExecutor.specialty : selectedExecutor.type}
              price={selectedExecutor.price}
              onSign={handleContractSign}
              onCancel={() => setShowContractDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Wrench" size={24} className="text-primary" />
              <span className="font-semibold">Хелперс</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Все права защищены</p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Условия</a>
              <a href="#" className="hover:text-primary transition-colors">Конфиденциальность</a>
              <a href="#" className="hover:text-primary transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;