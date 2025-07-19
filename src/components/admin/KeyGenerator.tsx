
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, Check, RefreshCw, Clock, Key, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { showNotification } from '@/services/notification-service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type KeyDurationType = '1 day' | '3 day' | 'week' | 'month' | 'lifetime';

interface GeneratedKey {
  id: number;
  key: string;
  duration: KeyDurationType;
  generatedAt: string;
  generatedBy: string;
  redeemedBy: string | null;
  status: 'active' | 'redeemed' | 'expired';
}

export const KeyGenerator = () => {
  const [keyDuration, setKeyDuration] = useState<KeyDurationType>('1 day');
  const [keyQuantity, setKeyQuantity] = useState(1);
  const [generatedKeys, setGeneratedKeys] = useState<GeneratedKey[]>([]);
  const [exportedKeys, setExportedKeys] = useState('');
  const [isExported, setIsExported] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState('generate');
  const { user } = useAuth();

  // Load keys on component mount
  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would fetch from the database
      // For now, we'll use mock data with a delay to simulate loading
      setTimeout(() => {
        const mockKeys: GeneratedKey[] = [
          {
            id: 1,
            key: 'ABCD-1234-EFGH-5678',
            duration: 'month',
            generatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
            generatedBy: 'admin@example.com',
            redeemedBy: 'john@example.com',
            status: 'redeemed'
          },
          {
            id: 2,
            key: 'IJKL-9012-MNOP-3456',
            duration: 'week',
            generatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
            generatedBy: 'djejhjejr@gmail.com',
            redeemedBy: null,
            status: 'active'
          },
          {
            id: 3,
            key: 'QRST-7890-UVWX-1234',
            duration: '1 day',
            generatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
            generatedBy: 'reseller@example.com',
            redeemedBy: null,
            status: 'expired'
          },
          {
            id: 4,
            key: 'ABCD-5678-EFGH-9012',
            duration: 'lifetime',
            generatedAt: new Date().toISOString(),
            generatedBy: 'admin@example.com',
            redeemedBy: null,
            status: 'active'
          }
        ];
        
        setGeneratedKeys(mockKeys);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      showNotification('Error', 'Failed to load keys', 'error');
      setIsLoading(false);
    }
  };

  // Generate a random key
  const generateRandomKey = () => {
    const keyChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 16;
    let result = '';
    for (let i = 0; i < length; i++) {
      if (i > 0 && i % 4 === 0) {
        result += '-';
      }
      result += keyChars.charAt(Math.floor(Math.random() * keyChars.length));
    }
    return result;
  };

  const handleGenerateKeys = async () => {
    if (!user) {
      showNotification('Error', 'You must be logged in to generate keys', 'error');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newKeys: GeneratedKey[] = [];
      const now = new Date().toISOString();
      
      for (let i = 0; i < keyQuantity; i++) {
        newKeys.push({
          id: Date.now() + i,
          key: generateRandomKey(),
          duration: keyDuration,
          generatedAt: now,
          generatedBy: user.email || 'unknown',
          redeemedBy: null,
          status: 'active'
        });
      }
      
      setGeneratedKeys([...newKeys, ...generatedKeys]);
      
      // Prepare keys for export
      const keysText = newKeys.map(k => k.key).join('\n');
      setExportedKeys(keysText);
      setIsExported(true);
      
      showNotification(
        'Keys Generated', 
        `Generated ${keyQuantity} ${keyDuration} key${keyQuantity > 1 ? 's' : ''}`,
        'success'
      );
      
      setTabValue('export');
    } catch (error) {
      showNotification('Error', 'Failed to generate keys', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exportedKeys);
      setIsCopied(true);
      showNotification('Copied', 'Keys copied to clipboard', 'success');
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      showNotification('Error', 'Failed to copy keys', 'error');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500';
      case 'redeemed':
        return 'bg-blue-500/10 text-blue-500';
      case 'expired':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={tabValue} onValueChange={setTabValue}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Keys</TabsTrigger>
          <TabsTrigger value="export">Export Keys</TabsTrigger>
          <TabsTrigger value="history">Key History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate License Keys</CardTitle>
              <CardDescription>
                Create new license keys for users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="key-duration">Key Duration</Label>
                  <Select 
                    value={keyDuration} 
                    onValueChange={(value) => setKeyDuration(value as KeyDurationType)}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="key-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 day">1 Day</SelectItem>
                      <SelectItem value="3 day">3 Days</SelectItem>
                      <SelectItem value="week">1 Week</SelectItem>
                      <SelectItem value="month">1 Month</SelectItem>
                      <SelectItem value="lifetime">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="key-quantity">Quantity</Label>
                  <Input 
                    id="key-quantity" 
                    type="number" 
                    min={1} 
                    max={100} 
                    value={keyQuantity}
                    onChange={(e) => setKeyQuantity(parseInt(e.target.value) || 1)}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2 lg:col-span-2 flex items-end">
                  <Button 
                    className="flex-1 gap-2" 
                    onClick={handleGenerateKeys}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4" />
                        Generate Keys
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Generated Keys</CardTitle>
              <CardDescription>
                Copy or download your generated license keys
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isExported ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="exported-keys">Generated Keys</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="flex items-center gap-1"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy All
                        </>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    id="exported-keys"
                    value={exportedKeys}
                    readOnly
                    rows={5}
                    className="font-mono"
                  />
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setTabValue('history')}
                    >
                      View in History
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Generate keys first to export them</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setTabValue('generate')}
                  >
                    Go to Generator
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Key History</CardTitle>
                <CardDescription>
                  View and manage generated keys
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadKeys}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Key</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Generated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Generated By</TableHead>
                      <TableHead>Redeemed By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-24">
                          <div className="flex flex-col items-center justify-center">
                            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-2"></div>
                            <p className="text-muted-foreground">Loading keys...</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : generatedKeys.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12">
                          <p className="text-muted-foreground">No keys generated yet</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      generatedKeys.map((keyItem) => (
                        <TableRow key={keyItem.id}>
                          <TableCell className="font-mono">{keyItem.key}</TableCell>
                          <TableCell>{keyItem.duration}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {new Date(keyItem.generatedAt).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(keyItem.status)}`}>
                              {keyItem.status}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-[150px] truncate" title={keyItem.generatedBy}>
                            {keyItem.generatedBy}
                          </TableCell>
                          <TableCell>{keyItem.redeemedBy || '-'}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
