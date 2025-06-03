import React, { useState } from 'react';

interface MiniSet {
  reps: number;
  weight: number;
  tempo: string;
}

interface ClusterSet {
  miniSets: MiniSet[];
  restBetweenMiniSets: number;
  restBetweenClusters: number;
}

export interface ClusterSetData {
  clusters: ClusterSet[];
  totalClusters: number;
  targetMuscle: string;
  notes: string;
}

interface ClusterSetFormProps {
  onSave: (data: ClusterSetData) => void;
}

const ClusterSetForm: React.FC<ClusterSetFormProps> = ({ onSave }) => {
  const [clusters, setClusters] = useState<ClusterSet[]>([
    {
      miniSets: [
        { reps: 0, weight: 0, tempo: '' },
        { reps: 0, weight: 0, tempo: '' },
        { reps: 0, weight: 0, tempo: '' },
      ],
      restBetweenMiniSets: 10,
      restBetweenClusters: 120,
    },
  ]);

  const [settings, setSettings] = useState({
    totalClusters: 1,
    targetMuscle: '',
    notes: '',
  });

  const handleMiniSetChange = (
    clusterIndex: number,
    miniSetIndex: number,
    field: keyof MiniSet,
    value: string | number
  ) => {
    const newClusters = [...clusters];
    newClusters[clusterIndex].miniSets[miniSetIndex] = {
      ...newClusters[clusterIndex].miniSets[miniSetIndex],
      [field]: value,
    };
    setClusters(newClusters);
  };

  const handleClusterChange = (
    clusterIndex: number,
    field: keyof Omit<ClusterSet, 'miniSets'>,
    value: number
  ) => {
    const newClusters = [...clusters];
    newClusters[clusterIndex] = {
      ...newClusters[clusterIndex],
      [field]: value,
    };
    setClusters(newClusters);
  };

  const handleSettingsChange = (field: keyof typeof settings, value: string | number) => {
    setSettings({
      ...settings,
      [field]: value,
    });

    // Update number of clusters if totalClusters changes
    if (field === 'totalClusters') {
      const newTotal = Number(value);
      const currentTotal = clusters.length;
      
      if (newTotal > currentTotal) {
        // Add new clusters
        const newClusters = [...clusters];
        for (let i = currentTotal; i < newTotal; i++) {
          newClusters.push({
            miniSets: [
              { reps: 0, weight: 0, tempo: '' },
              { reps: 0, weight: 0, tempo: '' },
              { reps: 0, weight: 0, tempo: '' },
            ],
            restBetweenMiniSets: 10,
            restBetweenClusters: 120,
          });
        }
        setClusters(newClusters);
      } else if (newTotal < currentTotal) {
        // Remove excess clusters
        setClusters(clusters.slice(0, newTotal));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      clusters,
      ...settings,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">تنظیمات کلسترال</h3>
        
        {/* Common Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تعداد کلسترها
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={settings.totalClusters}
              onChange={(e) => handleSettingsChange('totalClusters', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              پیشنهاد: 3-5 کلستر
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عضله هدف
            </label>
            <input
              type="text"
              value={settings.targetMuscle}
              onChange={(e) => handleSettingsChange('targetMuscle', e.target.value)}
              placeholder="مثال: سینه، پشت بازو، جلو بازو"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              یادداشت‌ها
            </label>
            <input
              type="text"
              value={settings.notes}
              onChange={(e) => handleSettingsChange('notes', e.target.value)}
              placeholder="نکات مهم یا توضیحات"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Clusters */}
        <div className="space-y-6">
          {clusters.map((cluster, clusterIndex) => (
            <div key={clusterIndex} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h4 className="text-md font-medium text-gray-800 mb-4">
                کلستر {clusterIndex + 1}
              </h4>
              
              {/* Mini-sets */}
              <div className="space-y-4 mb-4">
                {cluster.miniSets.map((miniSet, miniSetIndex) => (
                  <div key={miniSetIndex} className="p-3 bg-gray-50 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      مینی‌ست {miniSetIndex + 1}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          وزنه (کیلوگرم)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={miniSet.weight}
                          onChange={(e) => handleMiniSetChange(clusterIndex, miniSetIndex, 'weight', parseInt(e.target.value))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          تعداد تکرار
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={miniSet.reps}
                          onChange={(e) => handleMiniSetChange(clusterIndex, miniSetIndex, 'reps', parseInt(e.target.value))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          پیشنهاد: 1-3 تکرار
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          تمپو (مثال: 2-1-2-0)
                        </label>
                        <input
                          type="text"
                          value={miniSet.tempo}
                          onChange={(e) => handleMiniSetChange(clusterIndex, miniSetIndex, 'tempo', e.target.value)}
                          placeholder="2-1-2-0"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rest Periods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    استراحت بین مینی‌ست‌ها (ثانیه)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={cluster.restBetweenMiniSets}
                    onChange={(e) => handleClusterChange(clusterIndex, 'restBetweenMiniSets', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    پیشنهاد: 10-20 ثانیه
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    استراحت بین کلسترها (ثانیه)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="300"
                    value={cluster.restBetweenClusters}
                    onChange={(e) => handleClusterChange(clusterIndex, 'restBetweenClusters', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    پیشنهاد: 2-3 دقیقه
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="text-md font-medium text-blue-800 mb-2">نکات مهم کلسترال</h4>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>هر کلستر شامل چند مینی‌ست با استراحت کوتاه است</li>
            <li>وزنه را سنگین‌تر از ست‌های معمولی انتخاب کنید</li>
            <li>تعداد تکرار در هر مینی‌ست باید کم باشد (1-3 تکرار)</li>
            <li>استراحت بین مینی‌ست‌ها باید کوتاه باشد (10-20 ثانیه)</li>
            <li>استراحت بین کلسترها باید طولانی‌تر باشد (2-3 دقیقه)</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          ذخیره تنظیمات
        </button>
      </div>
    </form>
  );
};

export default ClusterSetForm;