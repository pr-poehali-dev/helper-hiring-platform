import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface ContractSignatureProps {
  contractType: 'worker' | 'organization';
  executorName: string;
  clientName?: string;
  serviceName: string;
  price: string;
  onSign: (signatureData: SignatureData) => void;
  onCancel: () => void;
}

export interface SignatureData {
  clientFullName: string;
  clientPassport: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  executorFullName: string;
  executorPassport?: string;
  executorINN?: string;
  executorAddress: string;
  signatureDate: string;
  agreed: boolean;
}

const ContractSignature = ({ 
  contractType, 
  executorName, 
  clientName, 
  serviceName, 
  price, 
  onSign, 
  onCancel 
}: ContractSignatureProps) => {
  const [formData, setFormData] = useState<Partial<SignatureData>>({
    clientFullName: clientName || '',
    executorFullName: executorName,
    signatureDate: new Date().toLocaleDateString('ru-RU'),
    agreed: false
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof SignatureData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.clientFullName && 
           formData.clientPassport && 
           formData.clientAddress && 
           formData.clientPhone && 
           formData.clientEmail && 
           formData.executorAddress && 
           (contractType === 'worker' ? formData.executorPassport : formData.executorINN) &&
           formData.agreed;
  };

  const handleSign = () => {
    if (isFormValid()) {
      onSign(formData as SignatureData);
    }
  };

  const contractTemplate = contractType === 'worker' 
    ? `ДОГОВОР ВОЗМЕЗДНОГО ОКАЗАНИЯ УСЛУГ

г. Москва                                                                                     ${formData.signatureDate}

ЗАКАЗЧИК: ${formData.clientFullName}, паспорт ${formData.clientPassport}, проживающий(ая) по адресу: ${formData.clientAddress}, именуемый в дальнейшем «Заказчик», с одной стороны,

и

ИСПОЛНИТЕЛЬ: ${formData.executorFullName}, паспорт ${formData.executorPassport}, проживающий(ая) по адресу: ${formData.executorAddress}, именуемый в дальнейшем «Исполнитель», с другой стороны,

заключили настоящий Договор о нижеследующем:

1. ПРЕДМЕТ ДОГОВОРА
1.1. Исполнитель обязуется оказать услугу: ${serviceName}, а Заказчик обязуется принять и оплатить указанную услугу.

2. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЕТОВ
2.1. Стоимость услуги составляет ${price}.
2.2. Оплата производится после выполнения работ.

3. ПРАВА И ОБЯЗАННОСТИ СТОРОН
3.1. Исполнитель обязуется выполнить работу качественно и в срок.
3.2. Заказчик обязуется принять и оплатить выполненную работу.

4. ОТВЕТСТВЕННОСТЬ СТОРОН
4.1. За неисполнение или ненадлежащее исполнение обязательств стороны несут ответственность в соответствии с действующим законодательством РФ.

5. СРОК ДЕЙСТВИЯ ДОГОВОРА
5.1. Договор вступает в силу с момента его подписания и действует до полного исполнения обязательств.

Электронная подпись Заказчика: ${formData.clientFullName}
Дата подписания: ${formData.signatureDate}
Контакты: ${formData.clientPhone}, ${formData.clientEmail}`
    : `ДОГОВОР НА ОКАЗАНИЕ УСЛУГ С ОРГАНИЗАЦИЕЙ

г. Москва                                                                                     ${formData.signatureDate}

ЗАКАЗЧИК: ${formData.clientFullName}, паспорт ${formData.clientPassport}, проживающий(ая) по адресу: ${formData.clientAddress}, именуемый в дальнейшем «Заказчик», с одной стороны,

и

ИСПОЛНИТЕЛЬ: ${formData.executorFullName}, ИНН ${formData.executorINN}, юридический адрес: ${formData.executorAddress}, именуемый в дальнейшем «Исполнитель», с другой стороны,

заключили настоящий Договор о нижеследующем:

1. ПРЕДМЕТ ДОГОВОРА
1.1. Исполнитель обязуется организовать оказание услуги: ${serviceName}, а Заказчик обязуется принять и оплатить указанные услуги.

2. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЕТОВ
2.1. Стоимость услуги составляет ${price}.
2.2. Оплата производится по факту выполнения работ в соответствии с условиями договора.

3. ПРАВА И ОБЯЗАННОСТИ СТОРОН
3.1. Исполнитель обязуется организовать качественное выполнение услуг силами квалифицированных сотрудников.
3.2. Заказчик обязуется принять и оплатить выполненные услуги.
3.3. Исполнитель несет ответственность за действия своих сотрудников.

4. ОТВЕТСТВЕННОСТЬ СТОРОН
4.1. За неисполнение или ненадлежащее исполнение обязательств стороны несут ответственность в соответствии с действующим законодательством РФ.
4.2. Организация-исполнитель несет полную ответственность перед заказчиком за качество оказанных услуг.

5. СРОК ДЕЙСТВИЯ ДОГОВОРА
5.1. Договор вступает в силу с момента его подписания и действует до полного исполнения обязательств.

Электронная подпись Заказчика: ${formData.clientFullName}
Дата подписания: ${formData.signatureDate}
Контакты: ${formData.clientPhone}, ${formData.clientEmail}`;

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="FileText" className="h-6 w-6 text-primary" />
            Электронная подпись договора
          </CardTitle>
          <CardDescription>
            {contractType === 'worker' 
              ? 'Договор возмездного оказания услуг с физическим лицом'
              : 'Договор на оказание услуг с организацией'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Данные Заказчика</h3>
            
            <div>
              <Label htmlFor="clientFullName">ФИО полностью</Label>
              <Input 
                id="clientFullName"
                value={formData.clientFullName || ''}
                onChange={(e) => handleInputChange('clientFullName', e.target.value)}
                placeholder="Иванов Иван Иванович"
              />
            </div>

            <div>
              <Label htmlFor="clientPassport">Паспортные данные</Label>
              <Input 
                id="clientPassport"
                value={formData.clientPassport || ''}
                onChange={(e) => handleInputChange('clientPassport', e.target.value)}
                placeholder="1234 567890"
              />
            </div>

            <div>
              <Label htmlFor="clientAddress">Адрес проживания</Label>
              <Input 
                id="clientAddress"
                value={formData.clientAddress || ''}
                onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                placeholder="г. Москва, ул. Примерная, д. 1, кв. 1"
              />
            </div>

            <div>
              <Label htmlFor="clientPhone">Телефон</Label>
              <Input 
                id="clientPhone"
                value={formData.clientPhone || ''}
                onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                placeholder="+7 (900) 123-45-67"
              />
            </div>

            <div>
              <Label htmlFor="clientEmail">Email</Label>
              <Input 
                id="clientEmail"
                type="email"
                value={formData.clientEmail || ''}
                onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="border-t pt-4 space-y-4">
            <h3 className="font-semibold text-lg">Данные Исполнителя</h3>
            
            <div>
              <Label htmlFor="executorFullName">Название / ФИО</Label>
              <Input 
                id="executorFullName"
                value={formData.executorFullName || ''}
                onChange={(e) => handleInputChange('executorFullName', e.target.value)}
              />
            </div>

            {contractType === 'worker' ? (
              <div>
                <Label htmlFor="executorPassport">Паспортные данные</Label>
                <Input 
                  id="executorPassport"
                  value={formData.executorPassport || ''}
                  onChange={(e) => handleInputChange('executorPassport', e.target.value)}
                  placeholder="1234 567890"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="executorINN">ИНН организации</Label>
                <Input 
                  id="executorINN"
                  value={formData.executorINN || ''}
                  onChange={(e) => handleInputChange('executorINN', e.target.value)}
                  placeholder="1234567890"
                />
              </div>
            )}

            <div>
              <Label htmlFor="executorAddress">{contractType === 'worker' ? 'Адрес проживания' : 'Юридический адрес'}</Label>
              <Input 
                id="executorAddress"
                value={formData.executorAddress || ''}
                onChange={(e) => handleInputChange('executorAddress', e.target.value)}
                placeholder="г. Москва, ул. Примерная, д. 1"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 p-4 bg-muted rounded-lg">
            <Checkbox 
              id="agree"
              checked={formData.agreed || false}
              onCheckedChange={(checked) => handleInputChange('agreed', checked as boolean)}
            />
            <Label htmlFor="agree" className="text-sm cursor-pointer">
              Я ознакомлен(а) с условиями договора и согласен(а) с ними. 
              Подписывая договор электронной подписью, я подтверждаю достоверность указанных данных.
            </Label>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowPreview(true)}
              disabled={!isFormValid()}
            >
              <Icon name="Eye" className="mr-2 h-4 w-4" />
              Просмотр договора
            </Button>
            <Button 
              className="flex-1"
              onClick={handleSign}
              disabled={!isFormValid()}
            >
              <Icon name="FileCheck" className="mr-2 h-4 w-4" />
              Подписать договор
            </Button>
            <Button variant="ghost" onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Предварительный просмотр договора</DialogTitle>
            <DialogDescription>
              Проверьте правильность всех данных перед подписанием
            </DialogDescription>
          </DialogHeader>
          <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
            {contractTemplate}
          </pre>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContractSignature;
