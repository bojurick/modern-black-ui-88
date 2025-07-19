
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, AlertCircle, AlertTriangle, FileText, Clock, RefreshCw, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { showNotification } from '@/services/notification-service';
import { SystemStatusType } from '@/services/status-service';

interface Service {
  id: number;
  name: string;
  status: SystemStatusType;
  statusText: string;
  lastUpdated: string;
}

export const StatusPage = () => {
  const [globalStatus, setGlobalStatus] = useState<SystemStatusType>('operational');
  const [statusMessage, setStatusMessage] = useState('All systems operational');
  const [servicesStatus, setServicesStatus] = useState<Service[]>([]);
  const [statusHistory, setStatusHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const [showServiceUpdateModal, setShowServiceUpdateModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [newStatus, setNewStatus] = useState<SystemStatusType>('operational');
  const [newStatusMessage, setNewStatusMessage] = useState('');
  const { user } = useAuth();

  // Load status data on component mount
  useEffect(() => {
    loadStatusData();
  }, []);

  const loadStatusData = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would fetch from the database
      // For now, we'll use mock data with a delay to simulate loading
      setTimeout(() => {
        const mockServices: Service[] = [
          {
            id: 1,
            name: 'Authentication API',
            status: 'operational',
            statusText: 'No issues reported',
            lastUpdated: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 2,
            name: 'Script Execution Engine',
            status: 'operational',
            statusText: 'No issues reported',
            lastUpdated: new Date(Date.now() - 3600000 * 2).toISOString()
          },
          {
            id: 3,
            name: 'License Verification',
            status: 'operational',
            statusText: 'No issues reported',
            lastUpdated: new Date(Date.now() - 3600000 * 5).toISOString()
          },
          {
            id: 4,
            name: 'Database Storage',
            status: 'operational',
            statusText: 'No issues reported',
            lastUpdated: new Date(Date.now() - 3600000 * 8).toISOString()
          },
          {
            id: 5,
            name: 'Real-time Socket Connections',
            status: 'operational',
            statusText: 'No issues reported',
            lastUpdated: new Date(Date.now() - 3600000 * 3).toISOString()
          }
        ];
        
        const mockHistory = [
          {
            id: 1,
            date: new Date(Date.now() - 86400000 * 5).toISOString(),
            status: 'degraded',
            message: 'Database performance issues detected',
            updatedBy: 'admin@example.com'
          },
          {
            id: 2,
            date: new Date(Date.now() - 86400000 * 5 + 3600000 * 2).toISOString(),
            status: 'operational',
            message: 'Database performance issues resolved',
            updatedBy: 'admin@example.com'
          },
          {
            id: 3,
            date: new Date(Date.now() - 86400000 * 2).toISOString(),
            status: 'maintenance',
            message: 'Scheduled maintenance for system upgrades',
            updatedBy: 'djejhjejr@gmail.com'
          },
          {
            id: 4,
            date: new Date(Date.now() - 86400000 * 2 + 3600000 * 3).toISOString(),
            status: 'operational',
            message: 'Maintenance completed successfully',
            updatedBy: 'djejhjejr@gmail.com'
          }
        ];
        
        setServicesStatus(mockServices);
        setStatusHistory(mockHistory);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      showNotification('Error', 'Failed to load status data', 'error');
      setIsLoading(false);
    }
  };

  const handleUpdateGlobalStatus = async () => {
    if (!user) {
      showNotification('Error', 'You must be logged in to update status', 'error');
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setGlobalStatus(newStatus);
      setStatusMessage(newStatusMessage);
      
      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        date: new Date().toISOString(),
        status: newStatus,
        message: newStatusMessage,
        updatedBy: user.email || 'unknown'
      };
      
      setStatusHistory([newHistoryItem, ...statusHistory]);
      
      showNotification('Success', 'System status updated successfully', 'success');
      setShowStatusUpdateModal(false);
      
      // In a real app, this would call an API endpoint
      // await updateSystemStatus(newStatus, newStatusMessage, user.email);
    } catch (error) {
      showNotification('Error', 'Failed to update system status', 'error');
    }
  };

  const handleUpdateServiceStatus = async () => {
    if (!user || !selectedService) {
      showNotification('Error', 'You must be logged in and select a service', 'error');
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedServices = servicesStatus.map(service => {
        if (service.id === selectedService.id) {
          return {
            ...service,
            status: newStatus,
            statusText: newStatusMessage,
            lastUpdated: new Date().toISOString()
          };
        }
        return service;
      });
      
      setServicesStatus(updatedServices);
      
      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        date: new Date().toISOString(),
        status: newStatus,
        message: `${selectedService.name}: ${newStatusMessage}`,
        updatedBy: user.email || 'unknown'
      };
      
      setStatusHistory([newHistoryItem, ...statusHistory]);
      
      showNotification('Success', `${selectedService.name} status updated successfully`, 'success');
      setShowServiceUpdateModal(false);
      
      // In a real app, this would call an API endpoint
      // await updateServiceStatus(selectedService.id, newStatus, newStatusMessage);
    } catch (error) {
      showNotification('Error', 'Failed to update service status', 'error');
    }
  };

  const openStatusUpdateModal = () => {
    setNewStatus(globalStatus);
    setNewStatusMessage(statusMessage);
    setShowStatusUpdateModal(true);
  };

  const openServiceUpdateModal = (service: Service) => {
    setSelectedService(service);
    setNewStatus(service.status);
    setNewStatusMessage(service.statusText);
    setShowServiceUpdateModal(true);
  };

  const getStatusIcon = (status: SystemStatusType) => {
    switch (status) {
      case 'operational':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'maintenance':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'outage':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Check className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusColor = (status: SystemStatusType) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'degraded':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'maintenance':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'outage':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-green-500/10 text-green-500 border-green-500/20';
    }
  };

  const getStatusName = (status: SystemStatusType) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded Performance';
      case 'maintenance':
        return 'Maintenance';
      case 'outage':
        return 'Outage';
      default:
        return 'Operational';
    }
  };

  return (
    <div className="space-y-6">
      {/* Global System Status */}
      <Card className={`border-l-4 ${getStatusColor(globalStatus)}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(globalStatus)}
              <div>
                <CardTitle>System Status: {getStatusName(globalStatus)}</CardTitle>
                <CardDescription>Last updated: {new Date().toLocaleString()}</CardDescription>
              </div>
            </div>
            <Button onClick={openStatusUpdateModal}>Update Status</Button>
          </div>
        </CardHeader>
        <CardContent>
          <p>{statusMessage}</p>
        </CardContent>
      </Card>

      {/* Services Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>
              Current status of all services
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadStatusData}
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
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-24">
                      <div className="flex flex-col items-center justify-center">
                        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-2"></div>
                        <p className="text-muted-foreground">Loading services status...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  servicesStatus.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(service.status)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                            {getStatusName(service.status)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{service.statusText}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {new Date(service.lastUpdated).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openServiceUpdateModal(service)}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Status History */}
      <Card>
        <CardHeader>
          <CardTitle>Status History</CardTitle>
          <CardDescription>
            Recent status changes and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Updated By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statusHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <p className="text-muted-foreground">No status history available</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  statusHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="whitespace-nowrap">
                        {new Date(item.date).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status as SystemStatusType)}`}>
                          {getStatusName(item.status as SystemStatusType)}
                        </span>
                      </TableCell>
                      <TableCell>{item.message}</TableCell>
                      <TableCell>{item.updatedBy}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Update Global Status Modal */}
      {showStatusUpdateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Update System Status</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowStatusUpdateModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Update the global system status and provide a message
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="system-status">Status</Label>
                  <Select 
                    value={newStatus} 
                    onValueChange={(value) => setNewStatus(value as SystemStatusType)}
                  >
                    <SelectTrigger id="system-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Operational</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="degraded">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <span>Degraded Performance</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="maintenance">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span>Maintenance</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="outage">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span>Outage</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status-message">Status Message</Label>
                  <Textarea
                    id="status-message"
                    value={newStatusMessage}
                    onChange={(e) => setNewStatusMessage(e.target.value)}
                    placeholder="Provide details about the current status"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowStatusUpdateModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateGlobalStatus}>Update Status</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Update Service Status Modal */}
      {showServiceUpdateModal && selectedService && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Update Service Status</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowServiceUpdateModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Update status for {selectedService.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="service-status">Status</Label>
                  <Select 
                    value={newStatus} 
                    onValueChange={(value) => setNewStatus(value as SystemStatusType)}
                  >
                    <SelectTrigger id="service-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Operational</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="degraded">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <span>Degraded Performance</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="maintenance">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span>Maintenance</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="outage">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span>Outage</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="service-message">Status Message</Label>
                  <Textarea
                    id="service-message"
                    value={newStatusMessage}
                    onChange={(e) => setNewStatusMessage(e.target.value)}
                    placeholder="Provide details about the current status"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowServiceUpdateModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateServiceStatus}>Update Status</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};
