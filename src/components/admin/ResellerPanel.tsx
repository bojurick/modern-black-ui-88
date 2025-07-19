
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { showNotification } from '@/services/notification-service';
import { useAuth } from '@/contexts/AuthContext';
import { User, UserPlus, Key, CreditCard, Package, Clock, ArrowUpRight } from 'lucide-react';

interface Reseller {
  id: number;
  username: string;
  email: string;
  registrationDate: string;
  status: 'active' | 'inactive' | 'suspended';
  keysGenerated: number;
  keysRemaining: number;
  lastActiveAt: string;
}

interface ResellerPackage {
  id: number;
  name: string;
  description: string;
  keyCount: number;
  price: number;
  keyDuration: string;
}

export const ResellerPanel = () => {
  const [resellers, setResellers] = useState<Reseller[]>([]);
  const [packages, setPackages] = useState<ResellerPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReseller, setSelectedReseller] = useState<Reseller | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<ResellerPackage | null>(null);
  const [showAddKeyModal, setShowAddKeyModal] = useState(false);
  const [keyQuantity, setKeyQuantity] = useState(10);
  const { user } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would fetch from the database
      // For now, we'll use mock data with a delay to simulate loading
      setTimeout(() => {
        const mockResellers: Reseller[] = [
          {
            id: 1,
            username: 'reseller1',
            email: 'reseller1@example.com',
            registrationDate: '2023-05-15',
            status: 'active',
            keysGenerated: 240,
            keysRemaining: 60,
            lastActiveAt: new Date(Date.now() - 86400000 * 2).toISOString()
          },
          {
            id: 2,
            username: 'reseller2',
            email: 'reseller2@example.com',
            registrationDate: '2023-06-20',
            status: 'active',
            keysGenerated: 120,
            keysRemaining: 30,
            lastActiveAt: new Date(Date.now() - 86400000 * 5).toISOString()
          },
          {
            id: 3,
            username: 'premiumreseller',
            email: 'premium@example.com',
            registrationDate: '2023-03-10',
            status: 'active',
            keysGenerated: 500,
            keysRemaining: 100,
            lastActiveAt: new Date(Date.now() - 86400000 * 1).toISOString()
          },
          {
            id: 4,
            username: 'suspendedreseller',
            email: 'suspended@example.com',
            registrationDate: '2023-07-05',
            status: 'suspended',
            keysGenerated: 50,
            keysRemaining: 0,
            lastActiveAt: new Date(Date.now() - 86400000 * 30).toISOString()
          }
        ];

        const mockPackages: ResellerPackage[] = [
          {
            id: 1,
            name: 'Starter Package',
            description: '50 keys with 1 month duration',
            keyCount: 50,
            price: 20,
            keyDuration: '1 month'
          },
          {
            id: 2,
            name: 'Pro Package',
            description: '100 keys with 1 month duration',
            keyCount: 100,
            price: 35,
            keyDuration: '1 month'
          },
          {
            id: 3,
            name: 'Premium Package',
            description: '500 keys with 1 month duration',
            keyCount: 500,
            price: 150,
            keyDuration: '1 month'
          },
          {
            id: 4,
            name: 'Lifetime Package',
            description: '50 keys with lifetime duration',
            keyCount: 50,
            price: 100,
            keyDuration: 'lifetime'
          }
        ];
        
        setResellers(mockResellers);
        setPackages(mockPackages);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      showNotification('Error', 'Failed to load reseller data', 'error');
      setIsLoading(false);
    }
  };

  const filteredResellers = resellers.filter(reseller => 
    reseller.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    reseller.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddKeys = async () => {
    if (!user || !selectedReseller) {
      showNotification('Error', 'You must be logged in and select a reseller', 'error');
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedResellers = resellers.map(reseller => {
        if (reseller.id === selectedReseller.id) {
          return {
            ...reseller,
            keysRemaining: reseller.keysRemaining + keyQuantity
          };
        }
        return reseller;
      });
      
      setResellers(updatedResellers);
      setShowAddKeyModal(false);
      
      showNotification(
        'Keys Added', 
        `Added ${keyQuantity} keys to ${selectedReseller.username}`,
        'success'
      );
      
      // In a real app, this would call an API endpoint
      // await addKeysToReseller(selectedReseller.id, keyQuantity);
    } catch (error) {
      showNotification('Error', 'Failed to add keys', 'error');
    }
  };

  const handleSelectPackage = (packageItem: ResellerPackage) => {
    setSelectedPackage(packageItem);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="resellers">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resellers">Resellers</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resellers" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reseller Management</CardTitle>
              <CardDescription>
                Manage your resellers and their key allocations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input 
                    placeholder="Search resellers..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button className="sm:w-auto flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Reseller
                </Button>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Keys Generated</TableHead>
                      <TableHead>Keys Remaining</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-24">
                          <div className="flex flex-col items-center justify-center">
                            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-2"></div>
                            <p className="text-muted-foreground">Loading resellers...</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredResellers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12">
                          <p className="text-muted-foreground">No resellers found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredResellers.map((reseller) => (
                        <TableRow key={reseller.id}>
                          <TableCell className="font-medium">{reseller.username}</TableCell>
                          <TableCell>{reseller.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              reseller.status === 'active' 
                                ? 'bg-green-500/10 text-green-500' 
                                : reseller.status === 'inactive'
                                  ? 'bg-yellow-500/10 text-yellow-500'
                                  : 'bg-red-500/10 text-red-500'
                            }`}>
                              {reseller.status}
                            </span>
                          </TableCell>
                          <TableCell>{reseller.keysGenerated}</TableCell>
                          <TableCell>
                            <span className={`font-medium ${
                              reseller.keysRemaining > 20 
                                ? 'text-green-500' 
                                : reseller.keysRemaining > 0
                                  ? 'text-amber-500'
                                  : 'text-red-500'
                            }`}>
                              {reseller.keysRemaining}
                            </span>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {new Date(reseller.lastActiveAt).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  setSelectedReseller(reseller);
                                  setShowAddKeyModal(true);
                                }}
                              >
                                Add Keys
                              </Button>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="packages" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reseller Packages</CardTitle>
              <CardDescription>
                Manage and assign packages to resellers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {packages.map((packageItem) => (
                  <Card
                    key={packageItem.id}
                    className={`cursor-pointer border ${
                      selectedPackage?.id === packageItem.id 
                        ? 'border-primary ring-1 ring-primary' 
                        : ''
                    }`}
                    onClick={() => handleSelectPackage(packageItem)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle>{packageItem.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-3">
                        <p className="text-muted-foreground text-sm">{packageItem.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Key className="h-4 w-4 text-muted-foreground" />
                            <span>{packageItem.keyCount} keys</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span>${packageItem.price}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full flex items-center gap-2" size="sm">
                        <Package className="h-4 w-4" />
                        Assign Package
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reseller Reports</CardTitle>
              <CardDescription>
                Key generation and usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground text-sm">Total Resellers</p>
                      <p className="text-3xl font-bold">{resellers.length}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground text-sm">Active Resellers</p>
                      <p className="text-3xl font-bold">{resellers.filter(r => r.status === 'active').length}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground text-sm">Total Keys Generated</p>
                      <p className="text-3xl font-bold">{resellers.reduce((sum, r) => sum + r.keysGenerated, 0)}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground text-sm">Keys Available</p>
                      <p className="text-3xl font-bold">{resellers.reduce((sum, r) => sum + r.keysRemaining, 0)}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Keys Modal */}
      {showAddKeyModal && selectedReseller && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Keys to Reseller</CardTitle>
              <CardDescription>
                Adding keys to {selectedReseller.username}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="key-quantity">Number of Keys</Label>
                  <Input 
                    id="key-quantity" 
                    type="number" 
                    min={1} 
                    max={1000} 
                    value={keyQuantity}
                    onChange={(e) => setKeyQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Current Keys:</span>
                    <span>{selectedReseller.keysRemaining}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>New Total:</span>
                    <span>{selectedReseller.keysRemaining + keyQuantity}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowAddKeyModal(false)}>Cancel</Button>
              <Button onClick={handleAddKeys}>Add Keys</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};
