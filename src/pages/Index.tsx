import { useState, useEffect } from 'react';
import { Moon, Sun, Search, Star, Users, HelpCircle, FileText } from 'lucide-react';
import WorkerProfile from './WorkerProfile';
import OrganizationProfile from './OrganizationProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [userType, setUserType] = useState<'worker' | 'organization' | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const workers = [
    {
      id: 1,
      name: 'Александр Петров',
      specialty: 'Сантехник, электрик',
      rating: 4.8,
      reviews: 127,
      price: '2500₽/час',
      image: '👨‍🔧'
    },
    {
      id: 2,
      name: 'Мария Иванова',
      specialty: 'Уборка, помощь по хозяйству',
      rating: 4.9,
      reviews: 215,
      price: '1800₽/час',
      image: '👩‍💼'
    },
    {
      id: 3,
      name: 'Дмитрий Сидоров',
      specialty: 'Грузчик, переезды',
      rating: 4.7,
      reviews: 89,
      price: '2000₽/час',
      image: '💪'
    }
  ];

  const organizations = [
    {
      id: 1,
      name: 'Мастер на час',
      type: 'Универсальные услуги',
      workers: 45,
      rating: 4.8,
      price: 'от 2000₽/час'
    },
    {
      id: 2,
      name: 'Чистый дом',
      type: 'Клининговые услуги',
      workers: 32,
      rating: 4.9,
      price: 'от 1500₽/час'
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
              <button onClick={() => setActiveTab('register')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'register' ? 'text-primary' : 'text-muted-foreground'}`}>
                Стать исполнителем
              </button>
              <button onClick={() => setActiveTab('orders')} className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'orders' ? 'text-primary' : 'text-muted-foreground'}`}>
                Мои заказы
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
                  />
                </div>
                <Button size="lg" className="h-12 px-8">
                  Найти
                </Button>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-6">Популярные категории</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-lg transition-all hover:scale-105">
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
                        <Button>Связаться</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Каталог рабочих</h2>
              <div className="flex gap-2">
                <Input placeholder="Поиск по имени..." className="w-64" />
                <Button variant="outline">Фильтры</Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map((worker) => (
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
                      <Button>Связаться</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'organizations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Каталог организаций</h2>
              <Input placeholder="Поиск организаций..." className="w-64" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {organizations.map((org) => (
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
                      <Button>Подробнее</Button>
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
            <h2 className="text-3xl font-bold">Мои заказы</h2>
            
            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">Активные</TabsTrigger>
                <TabsTrigger value="completed">Завершенные</TabsTrigger>
                <TabsTrigger value="cancelled">Отмененные</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Сантехнические работы</CardTitle>
                        <CardDescription>Александр Петров • 15 декабря 2024</CardDescription>
                      </div>
                      <Badge>В процессе</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Замена смесителя на кухне</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-semibold">2500₽</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Отменить</Button>
                          <Button size="sm">Связаться</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="completed">
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>У вас пока нет завершенных заказов</p>
                </div>
              </TabsContent>
            </Tabs>
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
              />
            ) : (
              <OrganizationProfile 
                profileData={profileData} 
                onBack={() => setActiveTab('home')} 
              />
            )}
          </>
        )}
      </main>

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