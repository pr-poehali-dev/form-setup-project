import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('Займы онлайн на карту');
  const [subtitle, setSubtitle] = useState('Первый заём бесплатно*');
  const [imageUrl, setImageUrl] = useState('https://cdn.poehali.dev/files/0ac31c7c-f429-4d9b-a457-774c18628a7a.jpg');
  const [showCode, setShowCode] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateEmbedCode = () => {
    return `<div style="background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%); padding: 48px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; color: white; font-family: 'Montserrat', sans-serif; max-width: 1200px; margin: 0 auto;">
  <div style="flex: 1; padding-right: 40px;">
    <div style="font-size: 14px; font-weight: 500; margin-bottom: 16px; opacity: 0.9;">${title.split('\n')[0]}</div>
    <h1 style="font-size: 56px; font-weight: 700; line-height: 1.1; margin: 0;">${subtitle}</h1>
  </div>
  <div style="flex-shrink: 0; width: 400px;">
    <img src="${imageUrl}" alt="Character" style="width: 100%; height: auto; display: block;" />
  </div>
</div>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    toast({
      title: "Код скопирован!",
      description: "Вставьте код на свой сайт",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900">Конструктор баннеров</h1>
          <p className="text-gray-600">Создайте свой баннер и получите код для вставки</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 space-y-6 animate-scale-in">
            <h2 className="text-2xl font-bold text-gray-900">Настройки баннера</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Заголовок (над основным текстом)</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Займы онлайн на карту"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Основной текст</Label>
                <Textarea
                  id="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Первый заём бесплатно*"
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="image">Изображение персонажа</Label>
                <div className="mt-2 space-y-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500">Или вставьте URL изображения:</p>
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t space-y-3">
              <Button 
                onClick={() => setShowCode(!showCode)} 
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                <Icon name="Code" className="mr-2" size={20} />
                {showCode ? 'Скрыть код' : 'Получить код для вставки'}
              </Button>

              {showCode && (
                <div className="space-y-2 animate-fade-in">
                  <div className="relative">
                    <Textarea
                      value={generateEmbedCode()}
                      readOnly
                      className="font-mono text-xs"
                      rows={12}
                    />
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      className="absolute top-2 right-2"
                      variant="secondary"
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    <Icon name="Info" size={14} className="inline mr-1" />
                    Скопируйте этот код и вставьте на свой сайт
                  </p>
                </div>
              )}
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Предпросмотр</h2>
              <Icon name="Eye" size={24} className="text-gray-500" />
            </div>
            
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
              style={{
                background: 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%)',
              }}
            >
              <div className="flex items-center justify-between p-12">
                <div className="flex-1 pr-10 text-white">
                  <div className="text-sm font-medium mb-4 opacity-90">
                    {title}
                  </div>
                  <h1 className="text-5xl font-bold leading-tight">
                    {subtitle}
                  </h1>
                </div>
                
                <div className="flex-shrink-0 w-96">
                  <img 
                    src={imageUrl} 
                    alt="Character" 
                    className="w-full h-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
              </div>
            </div>

            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="flex items-start gap-3">
                <Icon name="Lightbulb" size={20} className="text-purple-600 mt-0.5" />
                <div className="text-sm text-purple-900">
                  <p className="font-semibold mb-1">Совет по дизайну</p>
                  <p>Используйте изображение на прозрачном фоне (PNG) для лучшего результата</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
