"use client";

import React, { useState, useEffect } from "react";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/lib_front/AuthContext";
import { apiClient } from "@/lib_front/api";
import { GameHistoryResponse } from "@/lib_front/types";
import { t } from "@/lib_front/i18n";
import { useApp } from "@/lib_front/store";

export default function HistoryView() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const { lang } = useApp();
  const [gameHistory, setGameHistory] = useState<GameHistoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [gameModeFilter, setGameModeFilter] = useState('all');
  const [error, setError] = useState<string | null>(null);

  const navigateToUserProfile = async (username: string) => {
    try {
      if (username === 'IA' || username === 'AI') return;

      const searchResponse = await apiClient.searchUsers(username, 1);
      if (searchResponse.results.length > 0) {
        const foundUser = searchResponse.results.find(user =>
          user.username.toLowerCase() === username.toLowerCase() ||
          user.display_name?.toLowerCase() === username.toLowerCase()
        );

        if (foundUser) {
          router.push(`/profile?userId=${foundUser.id}`);
        }
      }
    } catch (error) {
      console.error('Error navigating to user profile:', error);
    }
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, loading, router]);

  const loadGameHistory = async (page = 1, status = 'all', gameMode = 'all') => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiClient.getGameHistory({
        page,
        limit: 20,
        status: status !== 'all' ? status : undefined,
        gameMode: gameMode !== 'all' ? gameMode : undefined
      });

      setGameHistory(response);
      setCurrentPage(page);
    } catch (err) {
      console.error('Erreur lors du chargement de l\'historique:', err);
      setError(t(lang, 'cannotLoadHistory'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadGameHistory(currentPage, statusFilter, gameModeFilter);
    }
  }, [isAuthenticated, currentPage, statusFilter, gameModeFilter]);

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleGameModeFilterChange = (gameMode: string) => {
    setGameModeFilter(gameMode);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadGameHistory(page, statusFilter, gameModeFilter);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win': return 'text-green-400';
      case 'loss': return 'text-red-400';
      case 'draw': return 'text-yellow-400';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'win': return '🏆';
      case 'loss': return '💔';
      case 'draw': return '🤝';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <GradientBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">{t(lang, 'loading')}</div>
        </div>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="text-center mt-4">
              <h1 className="text-4xl font-bold text-white mb-2">
                📜 {t(lang, 'gamesHistory')}
              </h1>
              <p className="text-gray-300">
                {t(lang, 'watchFullHistory')}
              </p>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <label className="text-gray-300 text-sm mb-2">{t(lang, 'status')}</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => handleStatusFilterChange(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="all">{t(lang, 'all')}</option>
                    <option value="completed">{t(lang, 'finished')}</option>
                    <option value="in_progress">{t(lang, 'playing')}</option>
                    <option value="abandoned">{t(lang, 'stopped')}</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-300 text-sm mb-2">{t(lang, 'gamemode')}</label>
                  <select
                    value={gameModeFilter}
                    onChange={(e) => handleGameModeFilterChange(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="all">{t(lang, 'allModes')}</option>
                    <option value="classic">{t(lang, 'classic')}</option>
                    <option value="tournament">{t(lang, 'tournament')}</option>
                    <option value="custom">{t(lang, 'personalized')}</option>
                  </select>
                </div>
              </div>

              {gameHistory && (
                <div className="text-right text-sm text-gray-300">
                  <div>{t(lang, 'totalGames')}: {gameHistory.pagination.totalItems} {t(lang, 'games')}</div>
                  <div className="flex gap-4 mt-1">
                    <span className="text-green-400">🏆 {gameHistory.stats.wins}</span>
                    <span className="text-red-400">💔 {gameHistory.stats.losses}</span>
                    <span className="text-yellow-400">🤝 {gameHistory.stats.draws}</span>
                    <span className="text-gray-400">⏳ {gameHistory.stats.pending}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error ? (
            <div className="bg-red-500/20 text-red-300 p-4 rounded-lg text-center">
              {error}
            </div>
          ) : isLoading ? (
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 text-center">
              <div className="text-white text-xl">{t(lang, 'loadingHistory')}</div>
            </div>
          ) : gameHistory && gameHistory.games.length > 0 ? (
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6">
              <div className="space-y-3">
                {gameHistory.games.map((game) => (
                  <div
                    key={game.id}
                    className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">
                          {getResultIcon(game.result)}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${getResultColor(game.result)}`}>
                              {t(lang, game.result.toLowerCase() as 'win' | 'loss' | 'draw' | 'pending')}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="text-white font-mono">
                              {game.user_score} - {game.opponent_score}
                            </span>
                            <span className="text-gray-300">{t(lang, 'vs')}</span>
                            {(game.opponent_display_name || game.opponent_username) &&
                              (game.opponent_display_name || game.opponent_username) !== 'IA' &&
                              (game.opponent_display_name || game.opponent_username) !== 'AI' ? (
                              <button
                                onClick={() => navigateToUserProfile(game.opponent_display_name || game.opponent_username || '')}
                                className="text-blue-300 hover:text-blue-100 hover:underline transition-colors cursor-pointer bg-transparent border-none p-0 font-medium"
                                title={`${t(lang, 'seeProfile')} ${game.opponent_display_name || game.opponent_username}`}
                              >
                                {game.opponent_display_name || game.opponent_username}
                              </button>
                            ) : (
                              <span className="text-white">
                                {game.opponent_display_name || game.opponent_username || t(lang, 'ai')}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {game.game_mode} • {formatDuration(game.duration)} • {formatDate(game.created_at)}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-white font-mono text-lg">
                          {game.score_player1} - {game.score_player2}
                        </div>
                        <div className="text-xs text-gray-400">
                          {t(lang, 'gameId')}{game.id}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {gameHistory.pagination.totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  <button
                    onClick={() => handlePageChange(gameHistory.pagination.previousPage!)}
                    disabled={!gameHistory.pagination.hasPreviousPage}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                  >
                    {t(lang, 'previous')}
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, gameHistory.pagination.totalPages) }, (_, i) => {
                      const page = i + Math.max(1, gameHistory.pagination.currentPage - 2);
                      if (page > gameHistory.pagination.totalPages) return null;

                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-lg transition-colors ${page === gameHistory.pagination.currentPage
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                            }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(gameHistory.pagination.nextPage!)}
                    disabled={!gameHistory.pagination.hasNextPage}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                  >
                    {t(lang, 'next')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 text-center">
              <div className="text-gray-400 text-xl mb-4">📭</div>
              <div className="text-white text-lg mb-2">{t(lang, 'noGameFound')}</div>
              <div className="text-gray-400">
                {t(lang, 'finishFirstGame')}
              </div>
            </div>
          )}
        </div>
      </div>
    </GradientBackground>
  );
}

export { HistoryView };
