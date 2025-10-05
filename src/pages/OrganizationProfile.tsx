import { useState } from 'react';
import { ArrowLeft, Briefcase, DollarSign, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface OrganizationProfileProps {
  profileData: any;
  onBack: () => void;
  onUpdateProfile: (data: any) => void;
}

const OrganizationProfile = ({ profileData, onBack, onUpdateProfile }: OrganizationProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData || {});
  const stats = {
    totalEarnings: 850000,
    activeJobs: 12,
    completedJobs: 156,
    workers: profileData?.workers || 25
  };

  const activeAds = [
    { id: 1, title: 'Клининговые услуги офисов', price: 'от 3000₽', views: 342, applications: 23 },
    { id: 2, title: 'Генеральная уборка квартир', price: 'от 5000₽', views: 198, applications: 15 },
    { id: 3, title: 'Уборка после ремонта', price: 'от 8000₽', views: 267, applications: 18 }
  ];

  const applications = [
    { id: 1, client: 'ООО "Техно"', task: 'Уборка офиса 200м²', status: 'Новая', date: '10 окт 2024', price: '15000₽' },
    { id: 2, client: 'ТЦ "Европа"', task: 'Ежедневная уборка', status: 'Новая', date: '8 окт 2024', price: '25000₽' }
  ];

  const myOrders = [
    { id: 1, client: 'Петров И.', task: 'Генеральная уборка 3к квартиры', status: 'В работе', date: '9 окт 2024', price: '8000₽' }
  ];

  const handleSaveProfile = () => {
    onUpdateProfile(editData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <Icon name="Building2" size={40} className="text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{profileData?.name || 'Чистый дом'}</CardTitle>
                    <CardDescription className="text-lg">{profileData?.type || 'Клининговые услуги'}</CardDescription>
                  </div>
                </div>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile}>Сохранить</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Отмена</Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Редактировать профиль</Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Заработано</p>
                    <p className="text-xl font-bold">{stats.totalEarnings.toLocaleString()}₽</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Активных</p>
                    <p className="text-xl font-bold">{stats.activeJobs}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Завершено</p>
                    <p className="text-xl font-bold">{stats.completedJobs}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Сотрудников</p>
                    <p className="text-xl font-bold">{stats.workers}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="ads" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ads">Наши объявления</TabsTrigger>
              <TabsTrigger value="applications">Заявки</TabsTrigger>
              <TabsTrigger value="orders">Мои заказы</TabsTrigger>
              <TabsTrigger value="data">Данные организации</TabsTrigger>
            </TabsList>

            <TabsContent value="ads" className="mt-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Активные объявления</h3>
                <Button>
                  <Icon name="Plus" className="mr-2 h-4 w-4" />
                  Создать объявление
                </Button>
              </div>
              {activeAds.map((ad) => (
                <Card key={ad.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{ad.title}</CardTitle>
                        <CardDescription className="mt-1">
                          <span className="text-primary font-semibold">{ad.price}</span>
                        </CardDescription>
                      </div>
                      <Badge>Активно</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span>👁️ {ad.views} просмотров</span>
                      <span>📩 {ad.applications} откликов</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="applications" className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Заявки от клиентов</h3>
              <p className="text-sm text-muted-foreground mb-4">Заявки, отправленные вам клиентами. Примите или отклоните их.</p>
              {applications.map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{app.task}</CardTitle>
                        <CardDescription>Клиент: {app.client} • {app.date} • {app.price}</CardDescription>
                      </div>
                      <Badge variant={app.status === 'Новая' ? 'default' : 'secondary'}>
                        {app.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm">Взять в работу</Button>
                      <Button size="sm" variant="outline">Отклонить</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="orders" className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold mb-4">Мои заказы</h3>
              <p className="text-sm text-muted-foreground mb-4">Заявки, которые вы приняли в работу</p>
              {myOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{order.task}</CardTitle>
                        <CardDescription>Клиент: {order.client} • {order.date} • {order.price}</CardDescription>
                      </div>
                      <Badge variant="secondary">{order.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm">Связаться с клиентом</Button>
                      <Button size="sm" variant="outline">Завершить</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="data" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Данные организации</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Название</label>
                        <Input 
                          value={editData?.name || ''} 
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Тип услуг</label>
                        <Input 
                          value={editData?.type || ''} 
                          onChange={(e) => setEditData({...editData, type: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Количество сотрудников</label>
                        <Input 
                          type="number"
                          value={editData?.workers || ''} 
                          onChange={(e) => setEditData({...editData, workers: parseInt(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Контактный телефон</label>
                        <Input 
                          value={editData?.phone || ''} 
                          onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Название</p>
                        <p className="text-lg font-medium">{profileData?.name || 'Чистый дом'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Тип услуг</p>
                        <p className="text-lg font-medium">{profileData?.type || 'Клининговые услуги'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Количество сотрудников</p>
                        <p className="text-lg font-medium">{profileData?.workers || 25}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Контактный телефон</p>
                        <p className="text-lg font-medium">{profileData?.phone || '+7 (495) 123-45-67'}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;